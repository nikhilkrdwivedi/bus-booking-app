import mongoose from "mongoose";
const { Schema, model } = mongoose;

const seatSchema = new Schema({
  seating: {
    type: Number,
    default: 0
  }
})

const vehicleSchema = new Schema(
  {
    brand: {
      type: String,
      trim: true,
      required: true,
    },
    info: {
      type: String,
      trim: true,
      required: true,
    },
    number: {
      type: String,
      trim: true,
      required: true,
    },
    seats: seatSchema,
    type: {
      type: String,
      enum: ['bus'],
      default: 'bus'
    },
    provider: {
      type: Schema.ObjectId, ref: 'provider', required: true
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default model(`vehicles`, vehicleSchema, `vehicles`);