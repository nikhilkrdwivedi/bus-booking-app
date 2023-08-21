
import joi, { } from "joi";
import { error } from "./response.js";


const createRequest = {
  provider: joi.string().trim().required(),
  brand: joi.string().trim().required(),
  info: joi.string().trim().required(),
  number: joi.string().trim().required(),
  purchase: joi.string().trim().required(),
  capacity: joi.object({
    seating: joi.number().required(),
    rows:joi.number().optional(),
    columns:joi.number().required(),
    gallaryColumn:joi.number().required(),
    layout:joi.array().items(
        joi.array().items(joi.object({
            seatStatus: joi.string().required()
        })).required()
    ).required(),
  }).required(),
};

export const createValidation = (
  request,
  response,
  next
) => {
  const requestBodySchema = joi.object(createRequest);
  const requestBodyValidation = requestBodySchema.validate(request.body);
  if (requestBodyValidation.error) {
    return error(requestBodyValidation.error, response);
  } else {
    next();
  }
};

export default {
    createValidation,
};