import { Schema, model, Document, Types } from "mongoose";

export interface ICompany extends Document {
  owner: Types.ObjectId;
  companyName: string;
  service: string;
  location: string;
  bankingInfo: string;
  agents: Types.ObjectId[];
  tickets: Types.ObjectId[];
  invoices: Types.ObjectId[];
}

const CompanySchema = new Schema<ICompany>(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    companyName: { type: String, required: true },
    service: { type: String, required: true },
    location: { type: String, required: true },
    bankingInfo: { type: String, required: true },
    agents: [{ type: Schema.Types.ObjectId, ref: "Agent" }],
    tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
    invoices: [{ type: Schema.Types.ObjectId, ref: "Invoice" }],
  },
  { timestamps: true }
);

export default model<ICompany>("Company", CompanySchema);
