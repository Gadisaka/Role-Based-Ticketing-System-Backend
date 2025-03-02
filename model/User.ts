import { Schema } from "mongoose";

export const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["company", "agent", "customer"] },
  profileImage: String,
});
