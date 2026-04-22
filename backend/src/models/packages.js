import { Schema, model } from "mongoose";

const packageSchema = new Schema(
  {
    trackingNumber: { type: String, required: true, unique: true },
    weight: { type: Number, required: true },
    dimensions: { type: String, required: true },
    description: { type: String },
    senderId: { type: Schema.Types.ObjectId, ref: "Clients", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "Clients", required: true },
    status: { 
      type: String, 
      enum: ["Pending", "In Transit", "Delivered", "Cancelled"], 
      default: "Pending" 
    }
  },
  {
    timestamps: true,
  }
);

export default model("Packages", packageSchema);