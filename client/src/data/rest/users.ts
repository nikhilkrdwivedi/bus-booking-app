/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosHelper from "@data/axiosHelper";
import ENV from "@environment/index";

const USER_ENDPOINT = "/api/v1/users";

export function updatePassword(userId: string, payload: any) {
  return axiosHelper(
    `${ENV.BASE_URL + USER_ENDPOINT}/updatePassword/${userId}`,
    "PATCH",
    null,
    payload
  );
}

export function updateUser(userId: string, payload: any) {
  return axiosHelper(
    `${ENV.BASE_URL + USER_ENDPOINT}/${userId}`,
    "PUT",
    null,
    payload
  );
}

export default { updatePassword, updateUser };
