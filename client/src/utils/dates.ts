import moment from "moment";

export const getFormattedDate = (
  dateString: string,
  format: string = "MMMM Do YYYY, hh:mm A"
) => {
  if (!dateString) return "";

  return moment(dateString).format(format);
};
