import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken } from "../utils.js";

// @desc Register a new user
// route POST "api/users"
// @access Public
const registerUser = async (req, res) => {
      // Collect the information from the users request body
      const { name, email, password } = req.body;
      try {
            // Check the database to ensure that user is new
            const userExists = await User.findOne({ email });

            // Return an error in your response body if a user was found
            if (userExists) {
                  res.status(400).json({ message: "Already an Existing User" });
            }

            // If no user was found, hash the user provided passsword
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new User Model to fit with our USER MODEL in the database
            const newUser = new User({
                  name,
                  email,
                  password: hashedPassword,
            });

            // Save the newUser to the database
            const user = await newUser.save();

            //generate a token for the user
            const token = generateToken(user);

            // Save the token to the http-only Cookie
            res.cookie("authToken", token, { httpOnly: true, secure: true, sameSite: "strict" });

            //Post request sucessful  ✅
            res.status(201).json({
                  userId: user._id,
                  name: user.name,
                  email: user.email,
            });
      } catch (error) {
            // If something went wrong ❌
            res.status(500).json({ message: "Server Error in registering user" });
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
            const token = generateToken(user);

            // Send the token as an HTTP-only cookie
            res.cookie("authToken", token, { httpOnly: true, secure: true, sameSite: "strict" });

            res.status(200).json({
                  message: "Logged in successfully",
                  user: { id: user._id, name: user.name, email: user.email },
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

            res.status(200).json({ user });
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
      res.clearCookie("authToken");
      res.status(200).json({ message: "Logged out successfully" });
};

export { registerUser, loginUser, getUserProfile, getAllUsers, updateUserProfile, logoutUser };
