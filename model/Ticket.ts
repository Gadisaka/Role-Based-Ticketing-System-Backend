import { Schema } from "mongoose";

export const TicketSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  agent: { type: Schema.Types.ObjectId, ref: "Agent" },
  priority: { type: String, enum: ["Low", "Medium", "High"] },
  status: { type: String, enum: ["Open", "In Progress", "Closed"] },
  deadline: Date,
});
