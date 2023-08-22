


import joi, { } from "joi";
import { error } from "./response.js";
import { TRIP_STATUS } from "../../constants/trip.js";


const createRequest = {
    trip: joi.object({
        departureLocation: joi.string().trim().required().messages({
            'any.required': 'Departure location is mandatory field!',
        }),
        arrivalLocation: joi.string().trim().required().messages({
            'any.required': 'Arrival location is mandatory field!',
        }),
        departureAt: joi.date().required().greater(Date.now()).messages({
            'any.required': 'Departure time is mandatory field!',
            'date.greater': 'Departure time must be greater than current date and time'
        }),
        arrivalAt: joi.date().required().greater(Date.now()).min(joi.ref('departureAt')).messages({
            'any.required': 'Arrival time is mandatory field!',
            'date.min': 'Arrival time must be after departure time!',
            'date.greater': 'Arrival time must be greater than current date and time'
        }),
    }).required().messages({
        'any.required': 'Trip information is mandatory field!',
    }),
    provider: joi.string().trim().required().messages({
        'any.required': 'Provider is mandatory field!',
    }),
    vehicle: joi.string().trim().required().messages({
        'any.required': 'Vehicle is mandatory field!',
    }),
    perSeatPrice: joi.number().required().messages({
        'any.required': 'Seat price is mandatory field!',
    }),
    capacity: joi.object({
        _id: joi.string().optional(),
        availableSeats: joi.number().optional(),
        rows: joi.number().optional(),
        columns: joi.number().required(),
        gallaryColumn: joi.number().required(),
        layout: joi.array().items(
            joi.array().items(joi.object({
                seatStatus: joi.string().required(),
                seatNumber: joi.number().optional(),
                _id: joi.string().optional(),
                seatPrice: joi.number().optional()
            })).required()
        ).required(),
    }).required(),
};
const updateRequest = {
    ...createRequest,
    trip: joi.object({
        departureLocation: joi.string().trim().required().messages({
            'any.required': 'Departure location is mandatory field!',
        }),
        arrivalLocation: joi.string().trim().required().messages({
            'any.required': 'Arrival location is mandatory field!',
        }),
        departureAt: joi.date().required().messages({
            'any.required': 'Departure time is mandatory field!',
        }),
        arrivalAt: joi.date().required().min(joi.ref('departureAt')).messages({
            'any.required': 'Arrival time is mandatory field!',
            'date.min': 'Arrival time must be after departure time!',
        }),
    }).required().messages({
        'any.required': 'Trip information is mandatory field!',
    }),
    _id: joi.string().optional(),
    isActive: joi.boolean().optional(),
    createdAt: joi.string().optional(),
    updatedAt: joi.string().optional(),
    updatedBy: joi.string().optional(),
    __v: joi.number().optional(),
    tripStatus: joi.string().valid(TRIP_STATUS.IN_PROGRESS, TRIP_STATUS.COMPLETED, TRIP_STATUS.UPCOMING).optional()

}
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
export const updateValidation = (
    request,
    response,
    next
) => {
    const requestBodySchema = joi.object().keys(updateRequest);
    const requestBodyValidation = requestBodySchema.validate(request.body);
    if (requestBodyValidation.error) {
        console.log(requestBodyValidation)
        return error(requestBodyValidation.error, response);
    } else {
        next();
    }
};

export default {
    createValidation,
    updateValidation,
};