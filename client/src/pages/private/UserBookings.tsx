import Container from "@components/containers/Container";
import PageHeader from "@components/headers/PageHeader";
import NoDataFound from "@components/helpers/NoDataFound";
import FullScreenLoader from "@components/loaders/FullScreenLoader";
import { useTheme } from "@contexts/ThemeContext";
import { fetchBookings } from "@data/rest/booking";
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
        <div>{item?._id}</div>
      ))}
    </Container>
  );
}
