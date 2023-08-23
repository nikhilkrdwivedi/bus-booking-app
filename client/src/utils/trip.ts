/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";

export const getJourneyTime = (start: string, end: string) => {
  // Create two date objects
  const startDate = moment(start);
  const endDate = moment(end);

  // Calculate the difference in hours and minutes
  const duration = moment.duration(endDate.diff(startDate));

  const day = duration.days() * 24;

  let hours: any = duration.hours();
  hours += day;
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes: any = duration.minutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return hours + " hrs : " + minutes + " mins";
};
