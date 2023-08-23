/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@components/containers/Container";
import moment from "moment";
import { FaRupeeSign } from "react-icons/fa";
import { LuArmchair } from "react-icons/lu";
import Button from "@elements/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTrips } from "@data/rest/tripPlanner";
import { toast } from "react-toastify";
import { useTheme } from "@contexts/ThemeContext";
import { getJourneyTime } from "@utils/trip";
import NoDataFound from "@components/helpers/NoDataFound";
import FullScreenLoader from "@components/loaders/FullScreenLoader";
import Pagination from "@components/paginations/Pagination";

export default function Home() {
  const naviagte = useNavigate();
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [trips, setTrips] = useState<any>({});
  const [pagination, setPagination] = useState({
    currentPage: 0,
  });

  const getUpcomingTrips = async () => {
    try {
      const { data } = await fetchTrips();
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

  useEffect(() => {
    setLoading(true);
    getUpcomingTrips();
  }, [pagination]);

  return (
    <>
      <Container className="px-2 md:px-4 lg:px-24 xl:px-32 bg-gray-200 dark:bg-gray-800 w-full h-screen overflow-auto">
        <NoDataFound loading={loading} data={trips?.data} />
        <FullScreenLoader
          show={loading}
          showCloseIcon
          onClick={() => setLoading(false)}
        />
        {trips?.data && (
          <div className="flex flex-col h-[calc(100vh-65px)] justify-between">
            <div className="overflow-auto">
              {(trips?.data || []).map((bus: any, index: number) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 my-2 md:my-4 md:gap-4 border border-gray-400 dark:border-gray-600 rounded-md"
                >
                  <div className="col-span-1">
                    <div className="flex justify-center items-center md:items-start flex-col p-4">
                      <div className="text-gray-600 dark:text-gray-200 font-semibold text-md ">
                        {bus?.provider?.company}
                      </div>
                      <div className="text-gray-600 dark:text-gray-200  font-normal text-sm ">
                        {bus?.vehicle?.info}
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <div className="flex justify-center items-center flex-col p-4 ">
                      <div className="text-gray-600 dark:text-gray-200 font-normal text-md ">
                        from{" "}
                        <span className="font-semibold text-gray-600 dark:text-gray-200">
                          {bus?.tripInfo?.departureLocation}
                        </span>{" "}
                        to{" "}
                        <span className="font-semibold text-gray-600 dark:text-gray-200">
                          {bus?.tripInfo?.arrivalLocation}{" "}
                        </span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-200 font-normal text-sm ">
                        {" "}
                        {moment(bus?.tripInfo?.departureAt).format(
                          "MMM Do YYYY, hh:mm A"
                        )}{" "}
                        -{" "}
                        {moment(bus?.tripInfo?.arrivalAt).format(
                          "MMM Do YYYY, hh:mm A"
                        )}{" "}
                      </div>
                      <div className="text-gray-600 dark:text-gray-200 font-normal text-sm ">
                        {" "}
                        {getJourneyTime(
                          bus?.tripInfo?.departureAt,
                          bus?.tripInfo?.arrivalAt
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="flex justify-start items-center md:items-end flex-col p-4">
                      <div className="flex justify-start items-center text-lg font-bold text-gray-600 dark:text-gray-200 gap-1">
                        <FaRupeeSign /> {bus?.perSeatPrice}
                      </div>
                      <div className="flex justify-start items-center text-lg font-bold text-gray-600 dark:text-gray-200 gap-1">
                        <LuArmchair /> {bus?.capacity?.availableSeats}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-3 border-t border-gray-400 dark:border-gray-600">
                    <div className="flex justify-center items-end flex-col p-4">
                      <Button
                        classNames="w-32 bg-green-400 p-1.5 hover:bg-green-500 text-sm font-semibold hover:text-gray-200 text-gray-600"
                        title="Book Now"
                        onClick={() => naviagte("/booking", { state: bus })}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              page={trips?.pagination?.currentPage + 1}
              pages={trips?.pagination?.totalPages}
              total={trips?.pagination?.totalRecords}
              perPage={trips?.pagination?.limit}
              showCount
              className="bottom-0 sticky"
              onPageClick={(requiredPage: number) => {
                setPagination({ currentPage: requiredPage - 1 });
              }}
            />
          </div>
        )}
      </Container>
    </>
  );
}
