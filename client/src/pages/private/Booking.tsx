/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@components/containers/Container";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GiJourney } from "react-icons/gi";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineDepartureBoard } from "react-icons/md";
import { useState } from "react";
import { BUS_SEATING_SEAT_TYPES } from "@data/static/seatTypes";
import Card from "@components/cards/Card";
import Button from "@elements/Button";
import SeatingSeat from "@components/seats/SeatingSeat";
import { fetchTrip } from "@data/rest/tripPlanner";
import { toast } from "react-toastify";
import { useTheme } from "@contexts/ThemeContext";
import { getFormattedDate } from "@utils/dates";
import { createBooking } from "@data/rest/booking";
import { getJourneyTime } from "@utils/trip";
import PageHeader from "@components/headers/PageHeader";

export default function Booking() {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const tripId = location?.state?._id || "";
  const [tripInfo, setTripInfo] = useState<any>({});
  const [selectedSeats, setSelectSeats] = useState({});
  const [selectedSeatsInfo, setSelectSeatsInfo] = useState({
    selectedSeatCounts: 0,
    total: 0,
  });

  const resetStatus = () => {
    setSelectSeats({});
    setSelectSeatsInfo({ selectedSeatCounts: 0, total: 0.0 });
  };

  const fetchTripConfig = async (id: string) => {
    try {
      const { data } = await fetchTrip(id);
      setTripInfo(data?.data || {});
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "Operation Failed!";
      toast(errorMsg, {
        type: "error",
        theme: isDarkMode ? "dark" : "light",
      });
    }
  };

  useEffect(() => {
    if (tripId.length) {
      fetchTripConfig(tripId);
    }
  }, [tripId]);

  useEffect(() => {
    getTotalFair();
  }, [selectedSeats]);

  const updateSeat = (
    selectedSeat: string,
    rowIndex: number,
    colIndex: number
  ) => {
    const action = selectedSeat === "A" ? "S" : "A";
    const _layout = JSON.parse(JSON.stringify(tripInfo?.capacity?.layout));
    _layout[rowIndex][colIndex]["seatStatus"] = action;
    if (action === "S") {
      setSelectSeats({
        ...selectedSeats,
        [_layout[rowIndex][colIndex]["_id"]]: _layout[rowIndex][colIndex],
      });
    }
    if (action === "A") {
      setSelectSeats({
        ...selectedSeats,
        [_layout[rowIndex][colIndex]["_id"]]: undefined,
      });
    }
    setTripInfo((prev: any) => ({
      ...prev,
      capacity: {
        ...prev.capacity,
        layout: _layout,
      },
    }));
  };

  const getTotalFair = () => {
    let total = 0;
    const _selectedSeats = JSON.parse(JSON.stringify(selectedSeats));
    Object.keys(_selectedSeats).forEach((item) => {
      total += _selectedSeats[item]["seatPrice"];
    });

    setSelectSeatsInfo({
      ...selectedSeatsInfo,
      total: total.toFixed(2) as unknown as number,
      selectedSeatCounts: Object.keys(_selectedSeats).length,
    });
  };

  const bookSeat = async () => {
    try {
      const payload = {
        seats: Object.values(selectedSeats),
        tripId,
      };
      const { data } = await createBooking(payload);
      resetStatus();
      setTripInfo(data?.data || {});

      toast("Booking Confirmed!", {
        type: "success",
        theme: isDarkMode ? "dark" : "light",
      });
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "Operation Failed!";
      toast(errorMsg, {
        type: "error",
        theme: isDarkMode ? "dark" : "light",
      });
    }
  };
  return (
    <>
      <Container className="px-2 md:px-4 lg:px-20 xl:px-32 bg-white dark:bg-gray-800 w-full h-screen overflow-auto">
        <PageHeader showButton label="Book Seat" location="/" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-2">
          <div className="col-span-1">
            <Card
              title={"Bus Info"}
              cardClass="flex flex-col bg-gray-200 dark:bg-gray-600 rounded-md w-full text-gray-600 dark:text-gray-200 mb-4"
              headerClass="p-2 font-semibold border-b border-gray-300 dark:border-gray-200 text-gray-600 dark:text-gray-200"
              bodyClass="p-2"
            >
              <div className="flex flex-col justify-start items-start gap-2 md:gap-4">
                <div className="flex items-center gap-2">
                  <div>
                    <FiMapPin className="text-green-400 w-8 h-8" />
                  </div>
                  <div className="text-sm py-1">
                    <span className="font-semibold text-green-400">
                      {" "}
                      Origin:{" "}
                    </span>{" "}
                    {tripInfo?.tripInfo?.departureLocation}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div>
                    <FiMapPin className="text-pink-400 w-8 h-8" />
                  </div>
                  <div className="text-sm py-1">
                    <span className="font-semibold text-pink-400">
                      Destination:
                    </span>{" "}
                    {tripInfo?.tripInfo?.arrivalLocation}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <MdOutlineDepartureBoard className="text-green-400  w-8 h-8" />
                  </div>
                  <div className="text-sm py-1">
                    <span className="font-semibold text-green-400">
                      Departure:
                    </span>{" "}
                    {getFormattedDate(tripInfo?.tripInfo?.departureAt)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div>
                    <MdOutlineDepartureBoard className="text-pink-400  w-8 h-8" />
                  </div>
                  <div className="text-sm py-1">
                    <span className="font-semibold text-pink-400">
                      Arrival:
                    </span>{" "}
                    {getFormattedDate(tripInfo?.tripInfo?.arrivalAt)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <GiJourney className="text-sky-400  w-8 h-8" />
                  </div>
                  <div className="text-sm py-1">
                    <span className="font-semibold text-sky-400">
                      Journey Time:
                    </span>{" "}
                    {getJourneyTime(
                      tripInfo?.tripInfo?.departureAt,
                      tripInfo?.tripInfo?.arrivalAt
                    )}
                  </div>
                </div>
              </div>
            </Card>
            <Card
              title={"Seat Info"}
              bodyClass="p-2"
              cardClass="flex flex-col bg-gray-200 dark:bg-gray-600 rounded-md w-full text-gray-600 dark:text-gray-200"
              headerClass="p-2 font-semibold border-b border-gray-300 dark:border-gray-200 text-gray-600 dark:text-gray-200"
            >
              {BUS_SEATING_SEAT_TYPES.map(
                (item: { label: string; symbol: string }, index: number) => (
                  <div
                    className="flex justify-start items-center gap-2"
                    key={index}
                  >
                    {
                      <>
                        <SeatingSeat seat={item.symbol} />
                        <span className="text-sm font-normal text-gray-600 dark:text-gray-200">
                          {item.label}
                        </span>
                      </>
                    }
                  </div>
                )
              )}
            </Card>
          </div>
          <div className="col-span-1">
            <Card
              title={"Select Seat"}
              cardClass="flex flex-col bg-gray-200 dark:bg-gray-600 rounded-md w-full text-gray-600 dark:text-gray-200"
              headerClass="p-2 font-semibold border-b border-gray-300 dark:border-gray-200 text-gray-600 dark:text-gray-200"
              bodyClass=""
            >
              <div className="rounded-b-md border-b border-l border-r border-gray-300 dark:border-gray-200 flex justify-center items-center px-4 py-2">
                <div className=" text-sm font-normal text-gray-600 dark:text-gray-200">
                  Front Side
                </div>
              </div>
              <div className="flex flex-col justify-center items-center p-2 xl:p-4 bg-gray-200 dark:bg-gray-600  overflow-auto">
                {(tripInfo?.capacity?.layout || []).map(
                  (row: any, rowIndex: number) => (
                    <div key={rowIndex} className="flex items-center gap-1">
                      {row.map((col: any, colIndex: number) => (
                        <button
                          key={colIndex}
                          disabled={!["A", "S"].includes(col.seatStatus)}
                          className={`m-1`}
                          onClick={() => {
                            updateSeat(col.seatStatus, rowIndex, colIndex);
                          }}
                        >
                          <SeatingSeat seat={col.seatStatus} />
                        </button>
                      ))}
                    </div>
                  )
                )}
              </div>
              <div className="border border-gray-300 dark:border-gray-200 rounded-t-md flex justify-center items-center px-4 py-2">
                <div className="text-sm font-normal text-gray-600 dark:text-gray-200">
                  Back Side
                </div>
              </div>
            </Card>
          </div>

          <div className="col-span-1">
            <Card
              title={"Selected Seat Info"}
              cardClass="flex flex-col bg-gray-200 dark:bg-gray-600 rounded-md w-full text-gray-600 dark:text-gray-200"
              headerClass="p-2 font-semibold border-b border-gray-300 dark:border-gray-200 text-gray-600 dark:text-gray-200"
              bodyClass="p-2"
            >
              <div className="border-b-2 border-gray-300 py-2 text-gray-600 dark:text-gray-200">
                <div className="text-sm font-normal">Onward Journey </div>
                <div className="text-md font-normal">
                  From{" "}
                  <span className="font-semibold  ">
                    {tripInfo?.tripInfo?.departureLocation}
                  </span>{" "}
                  To{" "}
                  <span className="font-semibold ">
                    {" "}
                    {tripInfo?.tripInfo?.arrivalLocation}
                  </span>
                </div>
                <div className="text-md font-normal ">
                  On{" "}
                  <span className="font-semibold ">
                    {getFormattedDate(tripInfo?.tripInfo?.departureAt)}
                  </span>
                </div>
              </div>
              <div className="border-b-2 border-gray-300 py-2 text-gray-600 dark:text-gray-200">
                <div className="text-sm font-normal ">Seats Selected </div>
                <div className="text-md font-normal ">
                  {" "}
                  <span className="font-semibold ">Seat(s):</span>{" "}
                  {selectedSeatsInfo?.selectedSeatCounts}
                </div>
                <div className="text-md font-normal">
                  {" "}
                  <span className="font-semibold ">Total Fare:</span>{" "}
                  {selectedSeatsInfo?.total}
                </div>
              </div>
              <div className="my-2">
                <Button
                  classNames="w-full bg-green-400 text-gray-600 font-semibold p-1.5 hover:bg-green-600 hover:text-white"
                  title="Continue to Payment"
                  onClick={() => {
                    bookSeat();
                  }}
                />
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
