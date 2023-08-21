import mongoose from "mongoose";
const { Schema, model } = mongoose;
const addressSchema = new Schema({
    streetOne: {
      type: String,
      required: true
    },
    streetTwo:{
      type: String,
    },
    city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      zipcode: {
        type: String,
        required: true
      },
  },{_id:false});
  const contactSchema = new Schema({
    email: {
      type: String,
    },
    phone:{
      type: String,
    },
  },{_id:false})
const providerSchema = new Schema(
  {
    company: {
      type: String,
      trim: true,
      required: true,
    },
    address: addressSchema,
    contact: contactSchema,
    vehicles:[{ type: Schema.ObjectId, ref: 'vehicles' }],
    createdBy: { type: Schema.ObjectId, ref: 'users' },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default model(`providers`, providerSchema, `providers`);