import { Schema, model, Document, Types } from "mongoose";

export interface INotification extends Document {
  recipient: Types.ObjectId;
  message: string;
  type:
    | "Ticket Update"
    | "Invoice Reminder"
    | "Agent Invitation"
    | "SLA Breach";
  isRead: boolean;
}

const NotificationSchema = new Schema<INotification>(
  {
    recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "Ticket Update",
        "Invoice Reminder",
        "Agent Invitation",
        "SLA Breach",
      ],
      required: true,
    },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<INotification>("Notification", NotificationSchema);
