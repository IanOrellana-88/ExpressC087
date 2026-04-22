import { Schema, model } from "mongoose";

const routeSchema = new Schema(
  {
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    distance: { type: Number, required: true }, // Almacenado en km o millas
    estimatedTime: { type: String, required: true } // Ej: "45 min", "2 hours"
  },
  {
    timestamps: true,
  }
);

export default model("Routes", routeSchema);