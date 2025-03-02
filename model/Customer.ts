import { Schema } from "mongoose";

export const CustomerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  phone: String,
  location: String,
  tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
});
