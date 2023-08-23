import { Router } from "express";
import controller from "../controllers/bookings.js";
import validator from "../middlewares/requestValidators/bookings.js";
import validateToken from "../middlewares/validateToken.js";
const bookingRouter = Router();

bookingRouter.post(
    "/",
    validateToken,
    validator.createValidation,
    controller.createBooking
);
// bookingRouter.get(
//     "/:_id",
//     validateToken,
//     controller.getTrip
// );
bookingRouter.get(
    "/",
    validateToken,
    controller.getBookings
);
// bookingRouter.put(
//     "/:_id",
//     validateToken,
//     validator.updateValidation,
//     controller.updateTrip
// );
// bookingRouter.post("/logout", validateToken, controller.logout);
// bookingRouter.get("/validate-token", controller.validateToken);

export default bookingRouter;