import { Router } from "express";
import controller from "../controllers/providers.js";
import validator from "../middlewares/requestValidators/provider.js";
import validateToken from "../middlewares/validateToken.js";
const providerRouter = Router();

providerRouter.post(
  "/",
  validateToken,
  validator.createValidation,
  controller.createProvider
);
providerRouter.put(
  "/:_id",
  validateToken,
  controller.updateProvider
);
providerRouter.get(
  "/",
  validateToken,
  
  controller.getProviders
);
// providerRouter.post(
//   "/login",
//   validator.loginValidation,
//   controller.login
// );
// providerRouter.post("/logout", validateToken, controller.logout);
// providerRouter.get("/validate-token", controller.validateToken);

export default providerRouter;