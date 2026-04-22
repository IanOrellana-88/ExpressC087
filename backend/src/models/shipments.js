import { Schema, model } from "mongoose";

const shipmentSchema = new Schema(
  {
    packageId: { type: Schema.Types.ObjectId, ref: "Packages", required: true },
    routeId: { type: Schema.Types.ObjectId, ref: "Routes", required: true },
    driverId: { type: Schema.Types.ObjectId, ref: "Drivers", required: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: "Vehicles", required: true },
    departureDate: { type: Date, required: true },
    deliveryDate: { type: Date },
    status: { 
      type: String, 
      enum: ["Scheduled", "On Way", "Delivered", "Delayed"], 
      default: "Scheduled" 
    }
  },
  {
    timestamps: true,
  }
);

export default model("Shipments", shipmentSchema);