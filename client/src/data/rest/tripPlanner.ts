import qs from "querystring";
import axiosHelper from "@data/axiosHelper";
import ENV from "@environment/index";
const TRIP_PLANNER_ENDPOINT = "/api/v1/tripplanner";

export function fetchTrips(query: any = {}) {
  return axiosHelper(
    `${ENV.BASE_URL + TRIP_PLANNER_ENDPOINT}?${qs.stringify(query)}`,
    "GET",
    null,
    null
  );
}
export function fetchTrip(tripId: string) {
  return axiosHelper(
    `${ENV.BASE_URL + TRIP_PLANNER_ENDPOINT}/${tripId}`,
    "GET",
    null,
    null
  );
}
export function createTrip(payload: any) {
  return axiosHelper(
    `${ENV.BASE_URL + TRIP_PLANNER_ENDPOINT}/`,
    "POST",
    null,
    payload
  );
}
export function updateTrip(payload: any, tripId: string) {
  return axiosHelper(
    `${ENV.BASE_URL + TRIP_PLANNER_ENDPOINT}/${tripId}`,
    "PUT",
    null,
    payload
  );
}

export default { fetchTrip, createTrip, updateTrip, fetchTrips };
