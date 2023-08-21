
import joi from "joi";
import { error } from "./response.js";

const createRequest = {
  company: joi.string().trim().required(),
  address: joi.object({
    streetOne: joi.string().trim().required(),
    streetTwo:joi.string().trim().optional(),
    city:joi.string().trim().required(),
    state:joi.string().trim().required(),
    country:joi.string().trim().required(),
    zipcode: joi.string().trim().required(),
  }).required(),
  contact: joi.object({
    email: joi.string().email().trim().required(),
    phone:joi.string().trim().required(),
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
// export const registerValidation = (
//   request,
//   response,
//   next
// ) => {
//   const requestBodySchema = joi.object(registerRequestSchema);
//   const requestBodyValidation = requestBodySchema.validate(request.body);
//   if (requestBodyValidation.error) {
//     return error(requestBodyValidation.error, response);
//   } else {
//     next();
//   }
// };
export default {
    createValidation,
//   registerValidation,
};