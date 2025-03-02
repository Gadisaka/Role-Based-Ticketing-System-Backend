import { Schema } from "mongoose";

export const AgentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  profession: String,
  phone: String,
  bankingInfo: String,
  assignedTickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
});
