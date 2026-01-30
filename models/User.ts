import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    address: String,
    password: { type: String, unique: true },
  },
  { timestamps: true },
);

export const UserModel = models.User || mongoose.model("User", UserSchema);
