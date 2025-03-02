import { Schema } from "mongoose";

export const InvoiceSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  amount: Number,
  status: { type: String, enum: ["Pending", "Paid"] },
});
