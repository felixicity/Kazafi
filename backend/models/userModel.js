import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
      street: { type: String },
      city: { type: String },
      country: { type: String },
      phone: { type: String },
      firstname: { type: String },
      lastname: { type: String },
      postCode: { type: String },
      isDefault: { type: Boolean, default: false },
});

const userSchema = mongoose.Schema(
      {
            name: {
                  type: String,
                  trim: true,
            },
            email: {
                  type: String,
                  required: [true, "email is required"],
                  unique: true,
                  lowercase: true,
                  trim: true,
            },
            password: {
                  type: String,
                  required: [true, "Password is required"],
                  minlength: 6, // Ensure password security
            },
            phone: {
                  type: String,
            },
            addresses: [addressSchema],
            isAdmin: {
                  type: Boolean,
                  default: false, // Regular users are not admins by default
            },
            isVerified: {
                  type: Boolean,
                  default: false, // Can be used for email verification
            },
            verificationToken: String, // <-- New field
            tokenExpires: Date,
      },
      {
            timestamps: true,
      }
);

const User = mongoose.model("User", userSchema);
export default User;
