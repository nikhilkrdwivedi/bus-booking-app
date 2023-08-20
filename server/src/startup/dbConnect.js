/* eslint-disable no-undef */
import mongoose from "mongoose";
import environment from "../configurations/environment.js";

async function dbConnect() {
  try {
    // Connection With DB
    mongoose.connect(environment.MONGO_URI, environment.MONGO_OPTIONS);
    console.log(
      `Mongoose default connection is open to ${environment.MONGO_URI}`
    );
  } catch (err) {
    console.log(`Mongoose default connection has occurred ${err} error`);
    process.exit(1);
  }
}

export default dbConnect;