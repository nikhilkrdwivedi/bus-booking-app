import mongoose from "mongoose";
const { Schema, model } = mongoose;

const bookingSchema = new Schema(
    {
        trip: { type: Schema.ObjectId, ref: 'tripplanners' },
        user: { type: Schema.ObjectId, ref: 'users' },
        seatIds: { type: [Schema.ObjectId] },
        createdBy: { type: Schema.ObjectId, ref: 'users' },
        updatedBy: { type: Schema.ObjectId, ref: 'users' },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default model(`bookings`, bookingSchema, `bookings`);