import { Schema } from "mongoose";

export const NotificationSchema = new Schema({
  recipient: { type: Schema.Types.ObjectId, ref: "User" },
  message: String,
  type: {
    type: String,
    enum: ["Ticket Update", "Invoice Reminder", "Agent Invitation"],
  },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
