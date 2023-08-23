import httpResponseMessages from "../constants/httpResponseMessages.js";
import { update as updateTrip, fetch, countDocuments, fetchOne as fetchTrip } from "../providers/tripPlanner.js";
import { create } from "../providers/bookings.js";
import {
    getPaginationQueryData,
    getPaginationInfo,
} from "../helpers/pagination.js";
import { TRIP_STATUS } from "../constants/trip.js";

const getTripStatus = (trip) => {
    let currentDate = new Date();
    if (currentDate < trip.arrivalAt && currentDate < trip.departureAt) {
        return TRIP_STATUS.UPCOMING
    }
    if (currentDate > trip.arrivalAt && currentDate > trip.departureAt) {
        return TRIP_STATUS.COMPLETED
    }

    return TRIP_STATUS.IN_PROGRESS

}
const preparePayloadForTrip = (body) => {
    console.log(body)
    const { capacity: { layout }, perSeatPrice } = body;
    let seatNumber = 1
    const _layout = layout.map(row => {
        return row.map(col => {

            return { ...col, seatNumber: col.seatStatus === "A" ? seatNumber++ : -1, seatPrice: perSeatPrice }
        })
    })
    const _body = {
        ...body,
        tripStatus: getTripStatus(body.trip),
        capacity: {
            ...body.capacity,
            availableSeats: seatNumber - 1,
            layout: _layout
        }
    };
    console.log({ _body })
    return _body

}

export const createBooking = async (request, response) => {
    try {
        let { body: { tripId, seats } } = request;
        console.log(tripId, '<--->', seats)
        const requestSeat = seats;
        seats = seats.reduce(function (result, item) {
            result[item._id] = item;
            return result;
        }, {});

        let trip = await fetchTrip({ _id: tripId })
        if (!trip) return response
            .status(404)
            .json({ message: "No Trip Found", data: trip });

        let { capacity: { availableSeats, layout } } = trip;
        let updatedCount = 0;
        const _layout = layout.map(row => {
            return row.map(col => {
                if (seats[col._id] && col.seatStatus === 'A') {
                    updatedCount++;
                    console.log({ col })
                    console.log("---")
                    return { ...col, bookedBy: request?.user?._id, seatStatus: 'B' }
                }
                return col
            })
        })

        if (updatedCount !== requestSeat.length) {
            return response
                .status(404)
                .json({ message: "Seats aren't available, refresh page!", data: trip });
        }
        console.log({ seats, layout })
        const bookingPayload = {
            tripId,
            userId: request.user._id,
            seatIds: Object.keys(seats),
            createdBy: request.user._id,
            updatedBy: request.user._id,
        }
        const [updatedTrip, Booking] = await Promise.all([
            updateTrip({ _id: tripId }, { $set: { capacity: { availableSeats: (availableSeats - updatedCount), layout: _layout } } }),
            create(bookingPayload)
        ])
        return response
            .status(200)
            .json({ message: "Provider successfully created.", data: seats, trip, _layout, updatedCount, requestSeat: requestSeat.length, updatedTrip, Booking });

    } catch (error) {
        console.log({ error })
        return response
            .status(500)
            .json({ message: httpResponseMessages.INTERNAL_SERVER_ERROR, data: error });
    }
}
export const getBookings = async (request, response) => {
    try {
        const query = { isActive: true }
        const { skip, limit, currentPage } = getPaginationQueryData(request.query);
        const [data, total] = await Promise.all([
            fetch(query, skip, limit),
            countDocuments(query),
        ]);
        const pagination = getPaginationInfo(total, limit, currentPage);

        return response.status(200).json({
            success: true,
            message: httpResponseMessages.FETCH_SUCCESS,
            pagination,
            data,
        });
    } catch (error) {
        console.log({ error })
        return response.status(500).json({
            success: false,
            message: httpResponseMessages.INTERNAL_SERVER_ERROR,
            error,
        });
    }
};

export const getBooking = async (request, response) => {
    try {
        const { _id } = request.params;
        const query = { isActive: true, _id }
        const data = await fetchOne(query)


        return response.status(200).json({
            success: true,
            message: httpResponseMessages.FETCH_SUCCESS,
            data,
        });
    } catch (error) {
        console.log({ error })
        return response.status(500).json({
            success: false,
            message: httpResponseMessages.INTERNAL_SERVER_ERROR,
            error,
        });
    }
};

export const updateBooking = async (request, response) => {
    try {
        let updateBody = request.body;
        const { _id } = request.params;
        updateBody.updatedBy = request?.user?._id;
        updateBody = preparePayloadForTrip(updateBody)
        // USER_BLACKLIST_KEYS_FOR_UPDATE.forEach((key) => delete updateBody[key]);
        const data = await update({ _id }, updateBody, {
            new: true,
        });
        // await updateProvider({ _id: data.provider }, { $addToSet: { vehicles: data._id } });
        return response
            .status(200)
            .json({ message: "Provider successfully updated.", data });
    } catch (error) {
        console.log({ error })
        return response
            .status(500)
            .json({ message: httpResponseMessages.INTERNAL_SERVER_ERROR, data: error });
    }
};

export default { createBooking, getBookings, getBooking, updateBooking }