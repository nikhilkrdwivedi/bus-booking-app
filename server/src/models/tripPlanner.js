import mongoose from "mongoose";
import { capacitySchema } from "./vehicles.js";
const { Schema, model } = mongoose;
const tripSchema = new Schema({
    departureLocation: {
        type: String,
        required: true
    },
    arrivalLocation: {
        type: String,
        required: true
    },
    departureAt: {
        type: Date,
        required: true
    },
    arrivalAt: {
        type: Date,
        required: true
    }
}, { _id: false });

const tripPlannerSchema = new Schema(
    {
        vehicle: { type: Schema.ObjectId, ref: 'vehicles' },
        provider: { type: Schema.ObjectId, ref: 'providers' },
        trip: tripSchema,
        capacity: capacitySchema,
        perSeatPrice: { type: Number },
        createdBy: { type: Schema.ObjectId, ref: 'users' },
        updatedBy: { type: Schema.ObjectId, ref: 'users' },
        tripStatus: { type: String, enum: ['IN_PROGRESS', 'UPCOMING', 'COMPLETED'] },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default model(`tripplanners`, tripPlannerSchema, `tripplanners`);