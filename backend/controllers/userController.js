import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken } from "../utils.js";
import { sendVerificationEmail } from "../utils/sendMail.js";
import dotenv from "dotenv";

const generateVerificationToken = () => {
      const UUID = crypto.randomUUID(); // Generates a 64-character hex string
      return UUID;
};

// @desc Register a new user
// route POST "api/users"
// @access Public
const registerUser = async (req, res) => {
      // Collect the information from the users request body
      const { email, password } = req.body;

      try {
            // Check the database to ensure that user is new
            const userExists = await User.findOne({ email });

            // Return an error in your response body if a user was found
            if (userExists) {
                  //if user exists and is verified,return an error.
                  if (userExists.isVerified) {
                        return res.status(400).json({ message: "User already exists and is verified." });
                  }
                  res.status(400).json({ message: "User exists, please check your email for verification." });
            }

            // If no user was found, hash the user provided passsword
            const hashedPassword = await bcrypt.hash(password, 10);

            // --- NEW VERIFICATION LOGIC START ---
            const verificationToken = generateVerificationToken();
            const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // Expires in 24 hours
            // --- NEW VERIFICATION LOGIC END ---

            // Create a new User Model to fit with our USER MODEL in the database
            const newUser = new User({
                  email,
                  password: hashedPassword,
                  isVerified: false, // <-- Crucial: Default to false
                  verificationToken: verificationToken, // <-- Save the token
                  tokenExpires: tokenExpires, // <-- Save the expiration time
            });

            // Save the newUser to the database
            const user = await newUser.save();

            // --- NEW ACTION: Send Verification Email ---
            await sendVerificationEmail(user.email, verificationToken);

            //Post request sucessful  ✅
            res.status(201).json({
                  message: "Registration successful! Please check your email to verify your account.",
                  email: user.email,
            });
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error in registering user" });
      }
};

// userController.js (Add this new function)
const verifyUser = async (req, res) => {
      const { token } = req.query; // Get the token from the URL query string

      if (!token) {
            return res.status(400).send("Invalid verification link.");
      }

      try {
            // 1. Find the user by the token and check expiration
            const user = await User.findOne({
                  verificationToken: token,
                  tokenExpires: { $gt: Date.now() }, // $gt checks if tokenExpires is Greater Than current time
            });

            if (!user) {
                  // Handle expired or invalid token
                  return res.status(400).send("Verification link is invalid or has expired. Please register again.");
            }

            // 2. Update the user status
            user.isVerified = true;
            user.verificationToken = undefined; // Clear the token
            user.tokenExpires = undefined; // Clear the expiration date
            await user.save();

            // 3. Optional: Log the user in immediately after successful verification
            // You can generate and set the JWT cookie here if you want to auto-login.
            const authToken = generateToken(user);
            res.cookie("authToken", authToken, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "strict",
                  maxAge: 24 * 60 * 60 * 1000,
            });

            // 4. Redirect the user to a success page
            // Use a redirect for a better user experience after a GET request:
            return res.redirect("http://localhost:3000/verify/verification-success"); // Redirect to a success page on your frontend
      } catch (error) {
            console.error(error);
            res.status(500).send("Verification failed due to a server error.");
      }
};

// @desc Authenticate user/ set token
// route POST "api/users/auth"
// @access Public
const loginUser = async (req, res) => {
      const { email, password } = req.body;

      try {
            const user = await User.findOne({ email });

            if (!user) {
                  return res.status(400).json({ message: "Invalid credentials" });
            }

            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                  return res.status(400).json({ message: "Invalid credentials" });
            }

            // Generate JWT
            const authToken = generateToken(user);

            const isProduction = process.env.NODE_ENV === "production";

            //Send the token as an HTTP-only cookie
            res.cookie("authToken", authToken, {
                  httpOnly: true,
                  secure: isProduction ? true : false, // ✅ Only send over HTTPS in production
                  sameSite: isProduction ? "none" : "lax", // ✅ Prevent CSRF
            }); // Cookie expires in 1 day;

            res.status(200).json({
                  message: "Logged in successfully",
                  user: { id: user._id, email: user.email },
            });
      } catch (error) {
            res.status(500).json({ message: "Server Error in logging in" });
      }
};

// Get user profile (protected route)
const getUserProfile = async (req, res) => {
      const userId = req.userId; // Obtained from the authMiddleware

      try {
            // Find the user by ID
            const user = await User.findById(userId).select("-password");

            if (!user) {
                  res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(user);
      } catch (error) {
            // Handle the error properly by sending the response with a message
            res.status(500).json({ message: "Server error while getting user" });
      }
};

// Update user profile
const updateUserProfile = async (req, res) => {
      const userId = req.userId; // Obtained from the authMiddleware
      const { name, email, password } = req.body;

      try {
            // Find the user
            const user = await User.findById(userId);
            if (!user) {
                  res.status(404).json({ message: "User not found" });
            }

            // Update user data
            user.name = name || user.name;
            user.email = email || user.email;

            if (password) {
                  // Hash the new password
                  user.password = await bcrypt.hash(password, 10);
            }

            await user.save();
            res.status(200).json({
                  message: "Profile updated successfully",
                  user: { id: user._id, name: user.name, email: user.email },
            });
      } catch (error) {
            res.status(500).json({ message: "Server error in updating user" });
      }
};

const updateUserAddresses = async (req, res) => {
      const userId = req.userId;

      const addressData = req.body;

      try {
            const user = await User.findById(userId);

            // 1. FIX: Added 'return' to prevent execution after 404
            if (!user) {
                  return res.status(404).json({ message: "User not found" });
            }

            // 3. Logic: If the new address is marked as default, unset others
            if (addressData.isDefault) {
                  user.addresses.forEach((addr) => {
                        addr.isDefault = false;
                  });
            } else if (!user.addresses || user.addresses.length === 0) {
                  // 2. Logic: If it's the first address, make it default automatically
                  addressData["isDefault"] = true;
            }

            // 4. FIX: Use Mongoose's .push() or re-assignment
            // This ensures Mongoose tracks the change to the array
            user.addresses.push(addressData);

            await user.save();

            res.status(200).json({
                  message: "Addresses updated successfully",
                  addresses: user.addresses,
            });
      } catch (error) {
            console.error(error); // Always log the actual error for debugging
            res.status(500).json({ message: "Server error in updating addresses" });
      }
};

const getAllUsers = async (req, res) => {
      try {
            const users = await User.find();
            if (!users) {
                  res.status(400).json({ message: "No users Found" });
            }
            res.status(200).json({ users });
      } catch (error) {
            res.status(500).json({ message: "Server error while fetching users" });
      }
};

// Logout user (clear JWT cookie)
const logoutUser = (req, res) => {
      try {
            res.clearCookie("authToken");
            res.status(200).json({ message: "Logged out successfully" });
      } catch (err) {
            res.status(500).json({ message: "There was an error when logging out. Try again" });
      }
};

export {
      registerUser,
      verifyUser,
      loginUser,
      getUserProfile,
      getAllUsers,
      updateUserProfile,
      updateUserAddresses,
      logoutUser,
};
