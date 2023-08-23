/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@components/containers/Container";
import PageHeader from "@components/headers/PageHeader";
import NoDataFound from "@components/helpers/NoDataFound";
import FullScreenLoader from "@components/loaders/FullScreenLoader";
import KeyValueDisplay from "@components/texts/KeyValueDisplay";
import { useTheme } from "@contexts/ThemeContext";
import { fetchBookings } from "@data/rest/booking";
import { getFormattedDate } from "@utils/dates";
import { getJourneyTime } from "@utils/trip";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UserBookings() {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [userBookings, setUserBookings] = useState<any>({});

  const fetchUserBookings = async () => {
    try {
      const { data } = await fetchBookings();
      // console.log({ data: data.data });
      setUserBookings({ data: data.data, pagination: data?.pagination });
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "Operation Failed!";
      toast(errorMsg, {
        type: "error",
        theme: isDarkMode ? "dark" : "light",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setUserBookings(true);
    fetchUserBookings();
  }, []);
  return (
    <Container className="px-2 md:px-4 lg:px-20 xl:px-32 bg-white dark:bg-gray-800 w-full h-screen overflow-auto">
      <PageHeader showButton label="Your Bookings" location="/" />
      <NoDataFound
        loading={loading}
        description="No bookings found? Looks like the universe is conspiring to give you more free time!"
        subDescription="Book a seat now!"
        data={userBookings?.data}
      />
      <FullScreenLoader
        show={loading}
        showCloseIcon
        onClick={() => setLoading(false)}
      />
      {userBookings?.data?.map((item: any) => (
        <div className="grid md:grid-cols-3 p-2 m-2 rounded-md gap-4 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-200">
          <div>
            <KeyValueDisplay
              keyName={"Departure"}
              value={item?.trip?.tripInfo?.departureLocation}
            />
            <KeyValueDisplay
              keyName={"Arrival"}
              value={item?.trip?.tripInfo?.arrivalLocation}
            />
            <KeyValueDisplay
              keyName={"Departure At"}
              value={getFormattedDate(item?.trip?.tripInfo?.departureAt)}
            />
            <KeyValueDisplay
              keyName={"Arrival At"}
              value={getFormattedDate(item?.trip?.tripInfo?.arrivalAt)}
            />
            <KeyValueDisplay
              keyName={"Journey Time"}
              value={getJourneyTime(
                item?.trip?.tripInfo?.departureAt,
                item?.trip?.tripInfo?.arrivalAt
              )}
            />
          </div>
          <div>
            <KeyValueDisplay
              keyName={"Operator"}
              value={item?.trip?.provider?.company}
            />
            <KeyValueDisplay
              keyName={"Vehicle"}
              value={item?.trip?.vehicle?.brand}
            />
            <KeyValueDisplay
              keyName={"Type"}
              value={item?.trip?.vehicle?.info}
            />
            <KeyValueDisplay
              keyName={"Number"}
              value={item?.trip?.vehicle?.number}
            />
            <KeyValueDisplay
              keyName={"Contact"}
              value={`${item?.trip?.provider?.contact?.phone}(${item?.trip?.provider?.company})`}
            />
          </div>
          <div>
            <KeyValueDisplay
              keyName={"Seat('s)"}
              value={item?.seatIds?.length}
            />
            <KeyValueDisplay
              keyName={"Trip Status"}
              value={item?.trip?.tripStatus}
            />
          </div>
        </div>
      ))}
    </Container>
  );
}
