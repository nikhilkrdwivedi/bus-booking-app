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
  const [pagination, setPagination] = useState({
    currentPage: 0,
  });
  useEffect(() => {
    getTrips();
  }, [pagination]);

  const getTrips = async () => {
    try {
      const { data } = await fetchTrips(pagination);
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

        {providers?.pagination?.totalRecords && (
          <Pagination
            page={providers?.pagination?.currentPage + 1}
            pages={providers?.pagination?.totalPages}
            total={providers?.pagination?.totalRecords}
            perPage={providers?.pagination?.limit}
            showCount
            className="bottom-0 sticky"
            onPageClick={(requiredPage: number) => {
              console.log({ requiredPage });
              setPagination({ currentPage: requiredPage - 1 });
            }}
          />
        )}
        <Pagination
          page={trips?.pagination?.currentPage + 1}
          pages={trips?.pagination?.totalPages}
          total={trips?.pagination?.totalRecords}
          perPage={trips?.pagination?.limit}
          showCount
          className="bottom-0 sticky"
          onPageClick={(requiredPage: number) => {
            console.log({ requiredPage });
            setPagination({ currentPage: requiredPage - 1 });
          }}
        />
      </div>
    </Container>
  );
}
