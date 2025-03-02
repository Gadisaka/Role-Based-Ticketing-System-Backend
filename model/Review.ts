import { Schema, model, Document, Types } from "mongoose";

export interface IReview extends Document {
  customer: Types.ObjectId;
  agent?: Types.ObjectId;
  company?: Types.ObjectId;
  rating: number;
  comment: string;
}

const ReviewSchema = new Schema<IReview>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    agent: { type: Schema.Types.ObjectId, ref: "Agent" },
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    rating: { type: Number, required: true },
    comment: { type: String },
  },
  { timestamps: true }
);

export default model<IReview>("Review", ReviewSchema);
