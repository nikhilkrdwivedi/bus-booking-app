import { Router } from "express";
import controller from "../controllers/vehicles.js";
import validator from "../middlewares/requestValidators/vehicles.js";
import validateToken from "../middlewares/validateToken.js";
const vehicleRouter = Router();

vehicleRouter.post(
  "/",
  validateToken,
  validator.createValidation,
  controller.createVehicle
);
vehicleRouter.get(
  "/",
  validateToken,
  controller.getVehicles
);
vehicleRouter.get(
  "/:_id",
  validateToken,
  controller.getVehicle
);
vehicleRouter.put(
  "/:_id",
  validateToken,
  controller.updateVehicle
);
// vehicleRouter.get(
//   "/",
//   validateToken,
  
//   controller.getProviders
// );
// vehicleRouter.post(
//   "/login",
//   validator.loginValidation,
//   controller.login
// );
// vehicleRouter.post("/logout", validateToken, controller.logout);
// vehicleRouter.get("/validate-token", controller.validateToken);

export default vehicleRouter;