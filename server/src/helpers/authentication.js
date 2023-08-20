import { BLACKLIST_KEYS_FOR_RETURN_USER } from "../constants/authentications.js";

export const transformUserToReturnToClient = (payload) => {
  console.log(Object.keys(payload))
  BLACKLIST_KEYS_FOR_RETURN_USER.forEach((key) => delete payload[key]);
  return payload;
};

export default { transformUserToReturnToClient };