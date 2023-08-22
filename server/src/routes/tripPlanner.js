import { Router } from "express";
import controller from "../controllers/tripPlanner.js";
import validator from "../middlewares/requestValidators/tripPlanner.js";
import validateToken from "../middlewares/validateToken.js";
const tripPlannerRouter = Router();

tripPlannerRouter.post(
    "/",
    validateToken,
    validator.createValidation,
    controller.createTrip
);
tripPlannerRouter.get(
    "/:_id",
    validateToken,
    controller.getTrip
);
tripPlannerRouter.get(
    "/",
    validateToken,
    controller.getTrips
);
tripPlannerRouter.put(
    "/:_id",
    validateToken,
    validator.updateValidation,
    controller.updateTrip
);
// tripPlannerRouter.post("/logout", validateToken, controller.logout);
// tripPlannerRouter.get("/validate-token", controller.validateToken);

export default tripPlannerRouter;