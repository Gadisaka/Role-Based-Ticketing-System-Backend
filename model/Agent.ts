import { Schema, model, Document, Types } from "mongoose";

export interface IAgent extends Document {
  user: Types.ObjectId;
  profession: string;
  phone: string;
  bankingInfo: string;
  assignedTickets: Types.ObjectId[];
}

const AgentSchema = new Schema<IAgent>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    profession: { type: String, required: true },
    phone: { type: String, required: true },
    bankingInfo: { type: String, required: true },
    assignedTickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
  },
  { timestamps: true }
);

export default model<IAgent>("Agent", AgentSchema);
