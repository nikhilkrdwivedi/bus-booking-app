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
// vehicleRouter.put(
//   "/:_id",
//   validateToken,
//   controller.updateProvider
// );
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