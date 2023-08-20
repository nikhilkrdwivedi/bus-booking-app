import express from "express";
import cors from "cors";
import httpResponseMessages from "../constants/httpResponseMessages.js";
import authenticationRouter from "../routes/authentications.js";
import usersRouter from "../routes/users.js";
// import todoRouter from "../routes/todos";
import morgan from "morgan";
// import { sendEmail } from "../helpers/sendEmail.js";
// import { sendOtpTemplate } from "../templates/html/sendOtp.js";

export function createServer() {
  const app = express();
  let corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(morgan("dev"));

  // Route endpoints
  //   app.use("/api/v1/todos/", todoRouter);
  app.use("/api/v1/authentications/", authenticationRouter);
  app.use("/api/v1/users/", usersRouter);

  app.get("/", (request, response) => {
    // IN_PROGRESS STUFF
    // const body = sendOtpTemplate('Nikhil Kumar Dwivedi', 900090)
    // const mailOptions = {
    //   // from: 'developer.nikhil@outlook.com',
    //   recipients: ['authornikhildwivedi@gmail.com'],
    //   subject: 'Subject of the email',
    //   // text: 'Plain text email body',
    //   body: body,
    // };
    // sendEmail(mailOptions);

    return response.status(200).json({
      success: true,
      message: httpResponseMessages.SERVER_UP_AND_RUNNING,
      data: new Date(),
    });
  });
  return app;
}

export default createServer;
