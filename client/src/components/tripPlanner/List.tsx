/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@elements/Button";
import Table from "@elements/Table";
import TableRow from "@elements/TableRow";
import TableThead from "@elements/TableThead";
import { getJourneyTime } from "@utils/trip";
import moment from "moment";
import { BiTrip } from "react-icons/bi";
export default function List({ data, onClick }: any) {
  const thead = () => {
    const headers = [
      { label: "#" },
      { label: "Departure" },
      { label: "Arrival" },
      { label: "Departure At" },
      { label: "Arrival At" },
      { label: "Total Time" },
      { label: "Available Seats" },
      { label: "Status" },
      { label: "Provider" },
      { label: "Bus Number" },
      { label: "Actions" },
    ];
    return <TableThead headers={headers} />;
  };

  const tbody = () => {
    // const getJourneyTime = (start: string, end: string) => {
    //   // Create two date objects
    //   const startDate = moment(start);
    //   const endDate = moment(end);

    //   // Calculate the difference in hours and minutes
    //   const duration = moment.duration(endDate.diff(startDate));

    //   const day = duration.days() * 24;

    //   let hours: any = duration.hours();
    //   hours += day;
    //   if (hours < 10) {
    //     hours = "0" + hours;
    //   }
    //   let minutes: any = duration.minutes();
    //   if (minutes < 10) {
    //     minutes = "0" + minutes;
    //   }
    //   return hours + " hrs : " + minutes + " mins";
    // };
    return (
      <>
        {(data || []).map((_: any, index: number) => (
          <TableRow>
            <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
            <td className="whitespace-nowrap px-6 py-4">
              {_.tripInfo?.departureLocation}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              {" "}
              {_.tripInfo?.arrivalLocation}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              {moment(_.tripInfo?.departureAt).format(
                "MMMM Do YYYY, hh:mm A"
              ) || "NA"}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              {moment(_.tripInfo?.arrivalAt).format("MMMM Do YYYY, hh:mm A") ||
                "NA"}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              {getJourneyTime(_.tripInfo?.departureAt, _.tripInfo?.arrivalAt)}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              {_?.capacity?.availableSeats}
            </td>
            <td className="whitespace-nowrap px-6 py-4">{_?.tripStatus}</td>
            <td className="whitespace-nowrap px-6 py-4">
              {_.provider?.company}
            </td>
            <td className="whitespace-nowrap px-6 py-4">{_.vehicle?.number}</td>
            <td className="whitespace-nowrap px-6 py-4">
              <Button
                Icon={BiTrip}
                title="Edit Trip"
                classNames="px-4 py-1 bg-green-400 w-auto gap-2 text-gray-600 font-semibold"
                onClick={() => onClick(_)}
              />
            </td>
          </TableRow>
        ))}
      </>
    );
  };
  return <Table thead={thead()} tbody={tbody()} />;
}
