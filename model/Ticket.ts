import { Schema, model, Document, Types } from "mongoose";

export interface ITicketHistory {
  action: "created" | "updated" | "assigned" | "closed";
  user: Types.ObjectId;
  timestamp: Date;
}

export interface ITicket extends Document {
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  priority: "Low" | "Medium" | "High" | "Critical";
  company: Types.ObjectId;
  customer: Types.ObjectId;
  agent?: Types.ObjectId;
  history: ITicketHistory[];
  attachments?: string[];
  deadline?: Date;
  tags?: string[];
}

const TicketSchema = new Schema<ITicket>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    agent: { type: Schema.Types.ObjectId, ref: "Agent" },
    history: [
      {
        action: {
          type: String,
          enum: ["created", "updated", "assigned", "closed"],
          required: true,
        },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    attachments: [{ type: String }],
    deadline: { type: Date },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default model<ITicket>("Ticket", TicketSchema);
