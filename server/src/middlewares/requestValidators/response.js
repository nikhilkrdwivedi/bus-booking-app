/* eslint-disable no-useless-escape */
import httpResponseMessages from "../../constants/httpResponseMessages.js";
export const error = function error(error, response) {
  console.log({error})
  let errorMsg;
  if (typeof error === "string") {
    errorMsg = error;
  } else if (error.details[0].type === "string.regex.base") {
    const errorId = error.details[0].message.split(" ");
    errorMsg = `Invalid ${errorId[0]} ${error.details[0].context.value}`;
  } else if (error.details[0].path.length > 1) {
    errorMsg = `${error.details[0].path[0]} ${error.details[0].message}`;
  } else {
    console.log({errorMsg})
    errorMsg = error.details[0].message.replace(/\"/g, "").trim() + "!";
    errorMsg = errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1);
    console.log({errorMsg})
  }
  return response.status(error.status || 400).json({
    success: false,
    message: errorMsg,
    error: httpResponseMessages.BAD_REQUEST,
  });
};

export default {
  error,
};