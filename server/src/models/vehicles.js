import mongoose from "mongoose";
const { Schema, model } = mongoose;

const capacitySchema = new Schema({
  seating: {
    type: Number,
    default: 0,
    required: true
  },
  rows:{
    type: Number,
    default: 0,
    required: true
  },
  columns: {
    type: Number,
    default: 0,
    required: true
  },
  gallaryColumns: {
    type: Number,
    default: 0,
    required: true
  },
  layout:{
    type:[[{
      seatStatus:{type: String},
    }]], 
    required: true
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
      unique: true,
    },
    capacity: capacitySchema,
    purchase: {
      type: String,
      trim: true,
      required: true, 
    },
    type: {
      type: String,
      enum: ['bus'],
      default: 'bus'
    },

    provider: {
      type: Schema.ObjectId, ref: 'providers', required: true
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default model(`vehicles`, vehicleSchema, `vehicles`);