import { Schema, model, Document, Types } from "mongoose";

export interface IInvoice extends Document {
  company: Types.ObjectId;
  customer: Types.ObjectId;
  amount: number;
  status: "Pending" | "Paid";
}

const InvoiceSchema = new Schema<IInvoice>(
  {
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  },
  { timestamps: true }
);

export default model<IInvoice>("Invoice", InvoiceSchema);
