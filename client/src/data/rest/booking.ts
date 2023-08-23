/* eslint-disable @typescript-eslint/no-explicit-any */
import qs from "querystring";
import axiosHelper from "@data/axiosHelper";
import ENV from "@environment/index";
const BOOKING_ENDPOINT = "/api/v1/bookings";

export function fetchBookings(query: any = {}) {
  return axiosHelper(
    `${ENV.BASE_URL + BOOKING_ENDPOINT}?${qs.stringify(query)}`,
    "GET",
    null,
    null
  );
}
export function fetchBooking(tripId: string) {
  return axiosHelper(
    `${ENV.BASE_URL + BOOKING_ENDPOINT}/${tripId}`,
    "GET",
    null,
    null
  );
}
export function createBooking(payload: any) {
  return axiosHelper(
    `${ENV.BASE_URL + BOOKING_ENDPOINT}/`,
    "POST",
    null,
    payload
  );
}
export function updateBooking(payload: any, tripId: string) {
  return axiosHelper(
    `${ENV.BASE_URL + BOOKING_ENDPOINT}/${tripId}`,
    "PUT",
    null,
    payload
  );
}

export default { fetchBooking, createBooking, updateBooking, fetchBookings };
