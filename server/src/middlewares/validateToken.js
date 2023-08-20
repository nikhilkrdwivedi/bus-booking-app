/* eslint-disable no-useless-escape */
import jwt from "jsonwebtoken";
import UserModel from "../models/users.js";
import environment from "../configurations/environment.js";
import httpResponseMessages from "../constants/httpResponseMessages.js";

const extractTokenFromHeader = (req) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        return req.headers.authorization.split(" ")[1];
    }
    return undefined;
};
const secret = new Uint8Array(
    environment.JWT_SECRET.split('').map((c) => c.charCodeAt(0)),
)

export const validateToken = async (req, res, next) => {
    let token = await extractTokenFromHeader(req);
    if (!token) {
        return res
            .status(401)
            .json({ message: httpResponseMessages.NO_TOKEN_AVAILABLE });
    }
    token = token.replace(/\"/g, "");
    try {
        const userToken = jwt.verify(token, secret, {
            issuer: environment.ISSUER_URL,
            algorithm: 'HS256'
        });
        if (!userToken) {
            return res
                .status(401)
                .json({ message: httpResponseMessages.INVALID_REQUEST });
        }
        const user = await UserModel.findOne({ _id: userToken.userId, tokens: token });
        if (!user) {
            return res
                .status(401)
                .json({ message: httpResponseMessages.ACCESS_DENIED });
        }
        req.user = user;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ message: httpResponseMessages.ACCESS_DENIED });
    }
};

export default validateToken;
