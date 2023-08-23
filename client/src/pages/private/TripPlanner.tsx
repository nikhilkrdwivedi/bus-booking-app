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
import NoDataFound from "@components/helpers/NoDataFound";
import FullScreenLoader from "@components/loaders/FullScreenLoader";

export default function TripPlanner() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [trips, setTrips] = useState<any>({});
  const [pagination, setPagination] = useState({
    currentPage: 0,
  });

  useEffect(() => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="px-2 md:px-4 lg:px-20 xl:px-32 dark:bg-gray-800 w-full">
      <Header showModal={() => navigate("/trip-config")} />
      <NoDataFound loading={loading} data={trips.data} />
      <FullScreenLoader
        show={loading}
        showCloseIcon
        onClick={() => setLoading(false)}
      />
      {trips?.data && (
        <div className="flex flex-col h-[calc(100vh-130px)] justify-between">
          <div className="overflow-auto">
            <List
              data={trips?.data}
              onClick={(trip: any) => navigate("/trip-config", { state: trip })}
            />
          </div>
          <Pagination
            page={trips?.pagination?.currentPage + 1}
            pages={trips?.pagination?.totalPages}
            total={trips?.pagination?.totalRecords}
            perPage={trips?.pagination?.limit}
            showCount
            className=""
            onPageClick={(requiredPage: number) => {
              setPagination({ currentPage: requiredPage - 1 });
            }}
          />
        </div>
      )}
    </Container>
  );
}
