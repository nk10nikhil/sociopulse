import mongoose, { Schema, model, models } from "mongoose"; // Importing mongoose and specific modules from mongoose
import bcrypt from "bcryptjs"; // Importing bcryptjs for password hashing

// Defining the IUser interface to specify the structure of a User document
export interface IUser {
  email: string; // User's email
  password: string; // User's password
  _id?: mongoose.Types.ObjectId; // Optional MongoDB ObjectId
  createdAt?: Date; // Optional creation date
  updatedAt?: Date; // Optional update date
}

// Creating a new schema for the User model with the specified fields and options
const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true }, // Email field, required and must be unique
    password: { type: String, required: true }, // Password field, required
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Pre-save middleware to hash the password before saving the user document
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) { // Check if the password field is modified
    this.password = await bcrypt.hash(this.password, 10); // Hash the password with a salt round of 10
  }
  next(); // Proceed to the next middleware or save operation
});

// Creating the User model if it doesn't already exist
const User = models?.User || model<IUser>("User", userSchema);

// Exporting the User model for use in other parts of the application
export default User;
