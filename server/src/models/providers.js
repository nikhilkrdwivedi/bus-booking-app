import mongoose from "mongoose";
const { Schema, model } = mongoose;

const vehicleSchema = new Schema(
  {
    company: {
      type: String,
      trim: true,
      required: true,
    },
    vehicles:[{ type: Schema.ObjectId, ref: 'vehicles' }],
    createdBy: { type: Schema.ObjectId, ref: 'users' },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default model(`vehicles`, vehicleSchema, `vehicles`);