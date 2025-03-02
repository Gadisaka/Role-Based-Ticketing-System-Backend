import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "company" | "agent" | "customer";
  profileImage?: string;
  phone?: string;
  isActive: boolean;
  permissions?: string[];
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["company", "agent", "customer"],
      required: true,
    },
    profileImage: { type: String },
    phone: { type: String },
    isActive: { type: Boolean, default: true },
    permissions: [{ type: String }],
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
