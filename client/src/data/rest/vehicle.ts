/* eslint-disable @typescript-eslint/no-explicit-any */
import qs from "querystring";
import axiosHelper from "@data/axiosHelper";
import ENV from "@environment/index";
const VEHICLE_ENDPOINT = "/api/v1/vehicles";

export function fetchVehicles(query: any = {}) {
  return axiosHelper(
    `${ENV.BASE_URL + VEHICLE_ENDPOINT}?${qs.stringify(query)}`,
    "GET",
    null,
    null
  );
}
export function fetchVehicle(vehicleId: string) {
  return axiosHelper(
    `${ENV.BASE_URL + VEHICLE_ENDPOINT}/${vehicleId}`,
    "GET",
    null,
    null
  );
}
export function createVehicle(payload: any) {
  return axiosHelper(
    `${ENV.BASE_URL + VEHICLE_ENDPOINT}/`,
    "POST",
    null,
    payload
  );
}
export function updateVehicle(payload: any, vehicleId: string) {
  return axiosHelper(
    `${ENV.BASE_URL + VEHICLE_ENDPOINT}/${vehicleId}`,
    "PUT",
    null,
    payload
  );
}

export default { fetchVehicle, createVehicle, updateVehicle, fetchVehicles };
