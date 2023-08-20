/* eslint-disable no-undef */
import * as dotenv from "dotenv";
dotenv.config();

// Export the enviroment object
export const environment = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_OPTIONS: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  JWT_SECRET: process.env.JWT_SECRET,
  ISSUER_URL: process.env.ISSUER_URL,
  AWS_CONFIG: {
    AWS_EMAIL_ACCESS_KEY_ID: process.env.AWS_EMAIL_ACCESS_KEY_ID,
    AWS_EMAIL_SECRET_ACCESS_KEY: process.env.AWS_EMAIL_SECRET_ACCESS_KEY,
    AWS_EMAIL_REGION: process.env.AWS_EMAIL_REGION,
  },
};

export default environment;