import { Schema } from "mongoose";

export const CompanySchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  name: String,
  service: String,
  location: String,
  bankingInfo: String,
  agents: [{ type: Schema.Types.ObjectId, ref: "Agent" }],
  tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
  invoices: [{ type: Schema.Types.ObjectId, ref: "Invoice" }],
});
