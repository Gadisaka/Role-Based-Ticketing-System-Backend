import { Schema, model, Document, Types } from "mongoose";

export interface ICustomer extends Document {
  user: Types.ObjectId;
  phone: string;
  location: string;
  tickets: Types.ObjectId[];
}

const CustomerSchema = new Schema<ICustomer>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
  },
  { timestamps: true }
);

export default model<ICustomer>("Customer", CustomerSchema);
