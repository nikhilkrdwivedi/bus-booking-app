import { Router } from "express";
import controller from "../controllers/authentications.js";
import validator from "../middlewares/requestValidators/authentications.js";
import validateToken from "../middlewares/validateToken.js";
const authenticationRouter = Router();

authenticationRouter.post(
  "/register",
  validator.registerValidation,
  controller.register
);
authenticationRouter.post(
  "/login",
  validator.loginValidation,
  controller.login
);
authenticationRouter.post("/logout", validateToken, controller.logout);
authenticationRouter.get("/validate-token", controller.validateToken);

export default authenticationRouter;