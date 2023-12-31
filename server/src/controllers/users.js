import bcrypt from "bcrypt";
import UserModel from "../models/users.js";
import { AUTH_CONSTANTS } from "../constants/authentications.js";
import {
    USER_BLACKLIST_KEYS_FOR_UPDATE,
} from "../constants/users.js";
import httpResponseMessages from "../constants/httpResponseMessages.js";

export const getUser = async (request, response) => {
    try {
        const { userId: _id } = request.params;
        const user = await UserModel.findOne({ _id }).select({ password: 0 });

        return response
            .status(200)
            .json({ message: "User successfully fetched.", data: user });
    } catch (error) {
        return response
            .status(500)
            .json({ message: httpResponseMessages.INTERNAL_SERVER_ERROR, data: error });
    }
};


export const updateUser = async (request, response) => {
    try {
        const updateBody = request.body;
        const { userId: _id } = request.params;


        USER_BLACKLIST_KEYS_FOR_UPDATE.forEach((key) => delete updateBody[key]);
        const data = await UserModel.findByIdAndUpdate({ _id }, updateBody, {
            new: true,
        });
        return response
            .status(200)
            .json({ message: "User successfully updated.", data });
    } catch (error) {
        return response
            .status(500)
            .json({ message: httpResponseMessages.INTERNAL_SERVER_ERROR, data: error });
    }
};
export const deleteUser = async (request, response) => {
    try {
        const { userId: _id } = request.params;
        const data = await UserModel.findByIdAndUpdate(
            { _id },
            { isActive: false },
            {
                new: true,
            }
        );
        return response
            .status(200)
            .json({ message: "User successfully deleted.", data });
    } catch (error) {
        return response
            .status(500)
            .json({ message: httpResponseMessages.INTERNAL_SERVER_ERROR, data: error });
    }
};
export const updatePassword = async (request, response) => {
    try {
        const _id = request.user._id;
        const password = request.body;
        console.log({ _id, password })
        if (!AUTH_CONSTANTS.passwordRegex.test(password.newPassword)) {
            return response.status(400).json({
                message: httpResponseMessages.INVALID_PASSWORD_ERROR
            });
        }
        //get user data
        const user = await UserModel.findOne({ _id }).select({ password: 1 });
        if (!user) {
            return response.status(400).json({
                message: httpResponseMessages.REGISTATION_ERROR,
                data: {},
            });
        }

        // compare passwords
        const match = bcrypt.compareSync(password?.password, user?.password);
        if (!match) {
            return response
                .status(400)
                .json({ message: httpResponseMessages.SEND_CORRECT_LOGIN_PASSWORD });
        }
        const newPassword = bcrypt.hashSync(
            password?.newPassword,
            AUTH_CONSTANTS.saltRounds
        );

        const data = await UserModel.findByIdAndUpdate(
            { _id },
            { password: newPassword },
            {
                new: true,
            }
        );
        data.password = undefined;
        return response
            .status(200)
            .json({ message: "Password successfully updated.", data });
    } catch (error) {
        console.log({ error })
        return response
            .status(500)
            .json({ message: httpResponseMessages.INTERNAL_SERVER_ERROR, data: error });
    }
};

export default {
    getUser,
    updateUser,
    deleteUser,
    updatePassword,
};
