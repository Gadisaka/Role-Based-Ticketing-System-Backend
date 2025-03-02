import { Schema } from "mongoose";

export const ReviewSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  agent: { type: Schema.Types.ObjectId, ref: "Agent" },
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  rating: Number,
  comment: String,
});
