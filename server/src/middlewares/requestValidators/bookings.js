


import joi, { } from "joi";
import { error } from "./response.js";
import { TRIP_STATUS } from "../../constants/trip.js";


const createRequest = {

    tripId: joi.string().trim().required().messages({
        'any.required': 'Trip Id is mandatory field!',
    }),
    seats:
        joi.array().items(joi.object({
            seatStatus: joi.string().required(),
            seatNumber: joi.number().optional(),
            _id: joi.string().optional(),
            seatPrice: joi.number().optional(),
            bookedBy: joi.string().optional(),
        })).required()

    // seats: joi.object({
    //     _id: joi.string().optional(),
    //     availableSeats: joi.number().optional(),
    //     rows: joi.number().optional(),
    //     columns: joi.number().required(),
    //     gallaryColumn: joi.number().required(),

    // }).required(),
};
// const updateRequest = {
//     ...createRequest,
//     trip: joi.object({
//         departureLocation: joi.string().trim().required().messages({
//             'any.required': 'Departure location is mandatory field!',
//         }),
//         arrivalLocation: joi.string().trim().required().messages({
//             'any.required': 'Arrival location is mandatory field!',
//         }),
//         departureAt: joi.date().required().messages({
//             'any.required': 'Departure time is mandatory field!',
//         }),
//         arrivalAt: joi.date().required().min(joi.ref('departureAt')).messages({
//             'any.required': 'Arrival time is mandatory field!',
//             'date.min': 'Arrival time must be after departure time!',
//         }),
//     }).required().messages({
//         'any.required': 'Trip information is mandatory field!',
//     }),
//     _id: joi.string().optional(),
//     isActive: joi.boolean().optional(),
//     createdAt: joi.string().optional(),
//     updatedAt: joi.string().optional(),
//     updatedBy: joi.string().optional(),
//     __v: joi.number().optional(),
//     tripStatus: joi.string().valid(TRIP_STATUS.IN_PROGRESS, TRIP_STATUS.COMPLETED, TRIP_STATUS.UPCOMING).optional()

// }
export const createValidation = (
    request,
    response,
    next
) => {
    const requestBodySchema = joi.object().keys(createRequest);
    const requestBodyValidation = requestBodySchema.validate(request.body);
    if (requestBodyValidation.error) {
        console.log(requestBodyValidation)
        return error(requestBodyValidation.error, response);
    } else {
        next();
    }
};
// export const updateValidation = (
//     request,
//     response,
//     next
// ) => {
//     const requestBodySchema = joi.object().keys(updateRequest);
//     const requestBodyValidation = requestBodySchema.validate(request.body);
//     if (requestBodyValidation.error) {
//         console.log(requestBodyValidation)
//         return error(requestBodyValidation.error, response);
//     } else {
//         next();
//     }
// };

export default {
    createValidation,
    // updateValidation,
};