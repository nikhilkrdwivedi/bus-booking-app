import { TRIP_STATUS } from "../constants/trip.js";

export const getTripStatus = (dates) => {
    const currentDate = new Date();
    const arrivalAt = new Date(dates.arrivalAt);
    const departureAt = new Date(dates.departureAt);
    console.log({
        currentDate, arrivalAt, departureAt
    })
    if (currentDate < arrivalAt && currentDate < departureAt) {
        return TRIP_STATUS.UPCOMING
    }
    if (currentDate > arrivalAt && currentDate > departureAt) {
        return TRIP_STATUS.COMPLETED
    }

    return TRIP_STATUS.IN_PROGRESS

}