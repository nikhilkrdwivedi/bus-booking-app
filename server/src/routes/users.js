import { Router } from "express";
const usersRouter = Router();
import {
    getUser,
    updateUser,
    updatePassword,
    deleteUser,
} from "../controllers/users.js";
import validateToken from "../middlewares/validateToken.js";

usersRouter.get("/:userId", validateToken, getUser);


usersRouter.put("/:userId", validateToken, updateUser);
usersRouter.patch("/updatePassword/:userId", validateToken, updatePassword);
usersRouter.delete(
    "/:userId",
    validateToken,
    deleteUser
);

export default usersRouter;
