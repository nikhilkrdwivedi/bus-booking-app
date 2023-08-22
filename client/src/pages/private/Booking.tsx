import Container from "@components/containers/Container";
import Header from "@components/headers/Header";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// import './App.css'
import moment from "moment";
import { TbArmchair } from "react-icons/tb";
import { FaRupeeSign } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import { BiBus } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineDepartureBoard } from "react-icons/md";
import { useState } from "react";
import { BUS_SEATING_SEAT_TYPES } from "@data/static/seatTypes";
import Card from "@components/cards/Card";
import Button from "@elements/Button";
import { BUS_SEATING_SEATS, BUS_SLEEPER_SEATS } from "@data/static/busSeats";
import SeatingSeat from "@components/seats/SeatingSeat";
import SleeperSeat from "@components/seats/SleeperSeat";
import { BUS_DETAILS } from "@data/static/busDetails";
import Home from "@pages/private/Home";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Outlet,
} from "react-router-dom";
import Private from "@routes/Private";
import { fetchTrip } from "@data/rest/tripPlanner";
import { toast } from "react-toastify";
import { useTheme } from "@contexts/ThemeContext";
import { getFormattedDate } from "@utils/dates";
export default function Booking() {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  // console.log({ location });
  const tripId = location?.state?._id || "";
  const [tripInfo, setTripInfo] = useState<any>({});
  const [seat, setSeat] = useState(BUS_SEATING_SEATS);
  const [selectedSeats, setSelectSeats] = useState({});
  const [selectedSeatsInfo, setSelectSeatsInfo] = useState({
    selectedSeatCounts: 0,
    total: 0.0,
  });
  const [isAuthenticated, setIsAuthenticate] = useState(true);
  // console.log("INIT:", seat);
  const fetchTripConfig = async (id: string) => {
    try {
      const { data } = await fetchTrip(id);
      // console.log({ data: data.data });
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
    // console.log({ selectedSeat, rowIndex, colIndex });
    const _layout = JSON.parse(JSON.stringify(tripInfo?.capacity?.layout));
    // console.log({ _seat, action });
    _layout[rowIndex][colIndex]["seatStatus"] = action;
    // console.log({ seatNo: _seat[rowIndex][colIndex] });
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

    // console.log({ selectedSeats, seat });
  };
  const getTotalFair = () => {
    let total = 0;
    const _selectedSeats = JSON.parse(JSON.stringify(selectedSeats));
    Object.keys(_selectedSeats).forEach((item) => {
      total += _selectedSeats[item]["seatPrice"];
    });
    // console.log("--->", { total });
    // for(const seat in _selectedSeats){
    //     // console.log("seat==>",seat, _selectedSeats[seat], _selectedSeats[seat]['price'])
    //     total =+ _selectedSeats[seat]['price']
    // };

    // console.log("===>", { total });
    setSelectSeatsInfo({
      ...selectedSeatsInfo,
      total: total.toFixed(2),
      selectedSeatCounts: Object.keys(_selectedSeats).length,
    });
    // return total.toFixed(2)
  };
  const bookSeat = () => {
    console.log({ selectedSeats });
    try {
      const { data } = await bookSeats(selectedSeats);
      // console.log({ data: data.data });
      setTripInfo(data?.data || {});
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
      {/* <Header /> */}
      <Container className="px-2 md:px-4 lg:px-20 xl:px-32 bg-gray-800 w-full h-screen overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-1 gap-2">
            <Card
              title={"Bus Info"}
              cardClass="flex flex-col bg-gray-200 rounded-md"
              headerClass="p-2 text-gray-600 font-semibold border-b border-gray-400 dark:border-gray-600"
              bodyClass="p-2"
            >
              <div className="flex flex-col justify-start items-start">
                <div className="flex items-center gap-2">
                  <div>
                    <FiMapPin className="text-green-600 w-8 h-8" />
                  </div>
                  <div className="text-sm py-2">
                    <span className="font-semibold text-green-600">
                      {" "}
                      Origin:{" "}
                    </span>{" "}
                    {tripInfo?.trip?.departureLocation}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div>
                    <FiMapPin className="text-red-600 w-8 h-8" />
                  </div>
                  <div className="text-sm py-2">
                    <span className="font-semibold text-red-600">
                      Destination:
                    </span>{" "}
                    {tripInfo?.trip?.arrivalLocation}
                  </div>
                </div>
                {/*   
                  <div className='flex items-center gap-2'>
                    <div>
                      <BiBus className="text-sky-600  w-9 h-9" />
                    </div>
                    <div className='text-sm py-2'>
                      <span className='font-semibold text-sky-600' >Bus Number:</span> KN-09-NC-9089</div>
                  </div> */}

                <div className="flex items-center gap-2">
                  <div>
                    <MdOutlineDepartureBoard className="text-green-600  w-10 h-10" />
                  </div>
                  <div className="text-sm py-2">
                    <span className="font-semibold text-green-600">
                      Departure:
                    </span>{" "}
                    {getFormattedDate(tripInfo?.trip?.departureAt)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div>
                    <MdOutlineDepartureBoard className="text-red-600  w-10 h-10" />
                  </div>
                  <div className="text-sm py-2">
                    <span className="font-semibold text-red-600">Arrival:</span>{" "}
                    {getFormattedDate(tripInfo?.trip?.arrivalAt)}
                  </div>
                </div>
              </div>
            </Card>
            <Card
              title={"Seat Info"}
              cardClass="flex flex-col bg-gray-200 rounded-md mt-2"
              headerClass="p-2 text-gray-600 font-semibold border-b border-gray-400 dark:border-gray-600"
              bodyClass="p-2"
            >
              {BUS_SEATING_SEAT_TYPES.map(
                (item: { label: string; symbol: string }, index: number) => (
                  <div
                    className="flex justify-start items-center py-1 gap-4"
                    key={index}
                    disabled={!["A", "S"].includes(item.symbol)}
                  >
                    {
                      <>
                        <SeatingSeat seat={item.symbol} />
                        <span className="text-md font-semibold text-gray-600">
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
              cardClass="flex flex-col bg-gray-200 rounded-md w-full"
              headerClass="p-2 text-gray-600 font-semibold border-b border-gray-400 dark:border-gray-600"
              bodyClass=""
            >
              <div className="bg-gray-300 flex justify-center items-center px-4 py-2">
                <div className=" text-md font-semibold text-gray-600">
                  Front Side
                </div>
              </div>
              <div className="flex flex-col justify-center items-center p-2 xl:p-4 bg-gray-100 overflow-auto">
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
                          {/* <span className="text-xs">{col?.seatPrice}</span>
                          {col?.seatNumber > 0 && (
                            <span className="text-xs">({col?.seatNumber})</span>
                          )} */}
                          {/* <span className="text-xs">({col?.seatNumber})</span> */}
                          {/* <SleeperSeat seat={col.bookingStatus} /> */}
                          {/* {getSeat(col.bookingStatus)} */}
                        </button>
                      ))}
                    </div>
                  )
                )}
              </div>
              <div className="bg-gray-300 flex justify-center items-center px-4 py-2">
                <div className=" text-md font-semibold text-gray-600">
                  Back Side
                </div>
              </div>
            </Card>
          </div>

          <div className="col-span-1">
            <Card
              title={"Selected Seat Info"}
              cardClass="flex flex-col bg-gray-200 rounded-md"
              headerClass="p-2 text-gray-600 font-semibold border-b border-gray-400 dark:border-gray-600"
              bodyClass="p-2"
            >
              <div className="border-b-2 border-gray-400 py-2">
                <div className="text-sm font-bold text-black ">
                  Onward Journey{" "}
                </div>
                <div className="text-md font-normal text-gray-900">
                  From{" "}
                  <span className="font-semibold text-gray-600">Hyderabad</span>{" "}
                  To{" "}
                  <span className="font-semibold text-gray-600">Bengaluru</span>
                </div>
                <div className="text-md font-normal text-gray-900">
                  On{" "}
                  <span className="font-semibold text-gray-600">
                    20 August, 2023
                  </span>
                </div>
              </div>
              <div className="border-b-2 border-gray-400 py-2">
                <div className="text-sm font-bold text-black ">
                  Seats Selected{" "}
                </div>
                <div className="text-md font-normal text-gray-900">
                  {" "}
                  <span className="font-semibold text-gray-600">
                    Seat(s):
                  </span>{" "}
                  {selectedSeatsInfo?.selectedSeatCounts}
                </div>
                <div className="text-md font-normal text-gray-900">
                  {" "}
                  <span className="font-semibold text-gray-600">
                    Total Fare:
                  </span>{" "}
                  {selectedSeatsInfo?.total}
                </div>
              </div>
              <div className="my-2">
                <Button
                  classNames="w-full bg-green-400 p-1.5 hover:bg-green-600 hover:text-white"
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
