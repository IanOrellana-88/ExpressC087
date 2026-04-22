/*
Campos:
    name
    lastName
    email
    password
    phone
    isVerified
    loginAttemps
    timeOut
*/

import mongoose, { Schema, model } from "mongoose";

const clientSchema = new Schema(
  {
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
        String
    },
    isVerified: {
      type: Boolean,
    },
    loginAttemps: {
      type: Number
    },
    timeOut: {
      type: Date
    }
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("Clients", clientSchema);

