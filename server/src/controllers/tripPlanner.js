import httpResponseMessages from "../constants/httpResponseMessages.js";
import { create, update, fetch, countDocuments, fetchOne } from "../providers/tripPlanner.js";
import { update as updateProvider } from "../providers/providers.js";
import {
    getPaginationQueryData,
    getPaginationInfo,
} from "../helpers/pagination.js";
import { getTripStatus } from "../helpers/dates.js";

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
        tripStatus: getTripStatus(body.tripInfo),
        capacity: {
            ...body.capacity,
            availableSeats: seatNumber - 1,
            layout: _layout
        }
    };
    console.log({ _body })
    return _body

}

export const createTrip = async (request, response) => {
    try {
        let { body } = request;
        body = preparePayloadForTrip(body)
        body.createdBy = request?.user?._id;
        const trip = await create(body);

        // await updateProvider({ _id: provider }, { $addToSet: { vehicles: vehicle._id } });

        return response
            .status(200)
            .json({ message: "Provider successfully created.", data: trip });
    } catch (error) {
        console.log({ error })
        return response
            .status(500)
            .json({ message: httpResponseMessages.INTERNAL_SERVER_ERROR, data: error });
    }
}
export const getTrips = async (request, response) => {
    try {
        const query = {
            isActive: true, "capacity.availableSeats": { $gt: 0 }, "tripInfo.arrivalAt": { $gt: new Date() }, "tripInfo.departureAt": { $gt: new Date() },
        }
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

export const getTrip = async (request, response) => {
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

export const updateTrip = async (request, response) => {
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

export default { createTrip, getTrips, getTrip, updateTrip }