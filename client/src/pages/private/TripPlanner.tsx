/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@components/containers/Container";
import Pagination from "@components/paginations/Pagination";
import Header from "@components/tripPlanner/Header";
import List from "@components/tripPlanner/List";
import { useTheme } from "@contexts/ThemeContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchTrips } from "@data/rest/tripPlanner";

export default function TripPlanner() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [trips, setTrips] = useState<any>({});

  useEffect(() => {
    getTrips();
  }, []);

  const getTrips = async () => {
    try {
      const { data } = await fetchTrips();
      setTrips({ data: data.data, pagination: data?.pagination });
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "Operation Failed!";
      toast(errorMsg, {
        type: "error",
        theme: isDarkMode ? "dark" : "light",
      });
    }
  };

  return (
    <Container className="px-2 md:px-4 lg:px-20 xl:px-32 dark:bg-gray-800 w-full h-screen overflow-auto">
      <div className="flex flex-col">
        <Header showModal={() => navigate("/trip-config")} />
        <List
          data={trips.data}
          onClick={(trip: any) => navigate("/trip-config", { state: trip })}
        />
        <Pagination
          page={trips?.pagination?.currentPage}
          pages={trips?.pagination?.totalPages}
          total={trips?.pagination?.totalRecords}
          perPage={trips?.pagination?.limit}
          showCount
          className="bottom-0 sticky"
        />
      </div>
    </Container>
  );
}