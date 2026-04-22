import { Schema, model } from "mongoose";

const driverSchema = new Schema(
  {
    name:
     { type: String, required: true },
    lastName:
     { type: String, required: true },
    licenseNumber:
     { type: String, required: true, unique: true }, 
    phone: 
    { type: String, required: true},
    email: 
    { type: String, required: true, unique: true },
    password: 
    { type: String, required: true },
    isActive: 
    { type: Boolean, default: true },
    isVerified: 
    { type: Boolean, default: false },
    loginAttemps: 
    { type: Number, default: 0 },
    timeOut: 
    { type: Date, default: null },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Drivers", driverSchema);
