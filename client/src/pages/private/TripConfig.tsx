/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@components/cards/Card";
import SeatOptionsCard from "@components/cards/SeatOptionsCard";
import Container from "@components/containers/Container";
import SeatingSeat from "@components/seats/SeatingSeat";
import KeyValueDisplay from "@components/texts/KeyValueDisplay";
import Button from "@elements/Button";
import Fieldset from "@elements/Fieldset";
import Input from "@elements/Input";
import Select from "@elements/Select";
import { fetch } from "@data/rest/providers";
import { BiTrip } from "react-icons/bi";
// import { createVehicle, fetchVehicle, updateVehicle } from "@data/rest/vehicle";
import { Disclosure } from "@headlessui/react";
import { useEffect, useState } from "react";
import { BiChevronsDown } from "react-icons/bi";
import { toast } from "react-toastify";
import { useTheme } from "@contexts/ThemeContext";
import { useLocation } from "react-router-dom";
// import { getDisplayValue } from "@utils/displayValue";
import { createTrip, fetchTrip, updateTrip } from "@data/rest/tripPlanner";
import moment from "moment";
import { getFormattedDate } from "@utils/dates";
export default function TripConfig() {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  // console.log({ location });
  const tripId = location?.state?._id || "";
  const fetchTripConfig = async (id: string) => {
    try {
      const { data } = await fetchTrip(id);
      // console.log({ data: data.data });
      setTripConfigForm(data.data);
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
  // const fetchVehicleConfig = async (id: string) => {
  //   try {
  //     const { data } = await fetchVehicle(id);
  //     // console.log({ data: data.data });
  //     setTripConfigForm(data.data);
  //   } catch (error: any) {
  //     const errorMsg = error?.response?.data?.message || "Operation Failed!";
  //     toast(errorMsg, {
  //       type: "error",
  //       theme: isDarkMode ? "dark" : "light",
  //     });
  //   }
  // };
  const [tripConfigForm, setTripConfigForm] = useState<any>({});

  const [providers, setProviders] = useState<any>({});

  const fetchProviders = async () => {
    try {
      const { data } = await fetch({ sendAllRecords: "YES" });
      setProviders({ data: data.data, pagination: data?.pagination });
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "Operation Failed!";
      toast(errorMsg, {
        type: "error",
        theme: isDarkMode ? "dark" : "light",
      });
    }
  };

  const handleSeatTypeInLayoutClick = (
    type: string,
    rowIndex: number,
    colIndex: number
  ) => {
    // console.log({ type, rowIndex, colIndex });
    const {
      capacity: { layout },
    } = tripConfigForm;
    layout[rowIndex][colIndex] = { seatStatus: type };
    setTripConfigForm((prev: any) => ({
      ...prev,
      capacity: {
        ...prev.capacity,
        layout,
      },
    }));
  };
  const handleTripConfigClick = async () => {
    // console.log({ tripConfigForm });
    try {
      const payload = JSON.parse(JSON.stringify(tripConfigForm));
      const { _id } = payload;
      let method: any = createTrip;
      if (_id) {
        delete payload["_id"];
        method = updateTrip;
      }
      await method(payload, _id);
      toast("Your changes have been saved.", {
        type: "success",
        theme: isDarkMode ? "dark" : "light",
      });
    } catch (error: any) {
      console.log({ error });
      const errorMsg = error?.response?.data?.message || "Operation Failed!";
      toast(errorMsg, {
        type: "error",
        theme: isDarkMode ? "dark" : "light",
      });
    }
  };
  const handletripConfigFormeChange = (
    key: string,
    value: any,
    identifier?: string
  ) => {
    // console.log({ key, value, identifier });
    if (identifier === "vehicle") {
      setTripConfigForm((prev: any) => ({
        ...prev,
        [key]: value,
        capacity: getVehicleCapacity(tripConfigForm?.provider, value),
      }));
    } else if (identifier === "provider") {
      setTripConfigForm((prev: any) => ({
        ...prev,
        [key]: value,
      }));
    } else if (identifier === "trip") {
      setTripConfigForm((prev: any) => ({
        ...prev,
        trip: {
          ...prev?.trip,
          [key]: value,
        },
      }));
    } else {
      setTripConfigForm((prev: any) => ({
        ...prev,
        [key]: value,
      }));
    }
    // console.log({ tripConfigForm });
  };

  useEffect(() => {
    fetchProviders();
  }, []);
  //   useEffect(() => {
  //     renderSeats();
  //   }, [
  //     tripConfigForm?.capacity?.rows,
  //     tripConfigForm?.capacity?.columns,
  //     tripConfigForm?.capacity?.gallaryColumn,
  //   ]);
  const getProviders = () => {
    return providers.data;
  };
  const getProvider = (providerId: string) => {
    const provider = providers?.data?.find(
      (item: any) => item?._id === providerId
    );
    return provider;
  };
  const getVehicles = (providerId: string) => {
    const provider = getProvider(providerId);
    // // console.log(provider);
    return provider?.vehicles || [];
  };
  const getVehicle = (providerId: string, vehicleId: string) => {
    const vehicles = getVehicles(providerId);
    // // console.log(provider);
    return vehicles?.find((item: any) => item?._id === vehicleId) || {};
  };

  const getVehicleCapacity = (providerId: string, vechicleId: string) => {
    // console.log({ providerId, vechicleId });
    const vehicles = getVehicles(providerId);
    // console.log({ vehicles });
    const vehicle = vehicles?.find((item: any) => item?._id === vechicleId);
    // console.log({ vehicle });
    return vehicle?.capacity || {};
  };
  return (
    <Container className="px-2 md:px-4 lg:px-20 xl:px-32 dark:bg-gray-800 w-full h-screen overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2 md:my-4">
        <div className="flex flex-col gap-4">
          <Disclosure as="div">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-md bg-gray-200 dark:bg-gray-900 px-4 py-2 text-left text-sm font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>Trip Details </span>
                  <BiChevronsDown
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-600 dark:text-gray-200 `}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                  <Fieldset
                    showLegend
                    legend="Journey Informations"
                    fieldsetClass="border p-2 border-gray-600 "
                    legendClass="text-white px-2"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        label="Departure Location*"
                        placeholder="eg: Bengaluru"
                        value={tripConfigForm?.trip?.departureLocation}
                        onChange={(event: any) =>
                          handletripConfigFormeChange(
                            "departureLocation",
                            event?.target?.value,
                            "trip"
                          )
                        }
                      />
                      <Input
                        type="text"
                        label="Arrival Location*"
                        placeholder="eg: Hyderabad"
                        value={tripConfigForm?.trip?.arrivalLocation}
                        onChange={(event: any) =>
                          handletripConfigFormeChange(
                            "arrivalLocation",
                            event?.target?.value,
                            "trip"
                          )
                        }
                      />
                      <Input
                        type="datetime-local"
                        label="Departure Date-Time*"
                        placeholder="eg: 10"
                        value={
                          tripConfigForm?.trip?.departureAt
                            ? getFormattedDate(
                                tripConfigForm?.trip?.departureAt,
                                "YYYY-MM-DDTHH:mm:ss"
                              )
                            : ""
                        }
                        onChange={(event: any) =>
                          handletripConfigFormeChange(
                            "departureAt",
                            event?.target?.value,
                            "trip"
                          )
                        }
                      />
                      <Input
                        type="datetime-local"
                        label="Arrival Date-Time*"
                        placeholder="eg: 10"
                        value={
                          tripConfigForm?.trip?.arrivalAt
                            ? getFormattedDate(
                                tripConfigForm?.trip?.arrivalAt,
                                "YYYY-MM-DDTHH:mm:ss"
                              )
                            : ""
                        }
                        onChange={(event: any) =>
                          handletripConfigFormeChange(
                            "arrivalAt",
                            event?.target?.value,
                            "trip"
                          )
                        }
                      />
                    </div>
                  </Fieldset>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-md bg-gray-200 dark:bg-gray-900 px-4 py-2 text-left text-sm font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>Provider Details </span>
                  <BiChevronsDown
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-600 dark:text-gray-200 `}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                  <Fieldset
                    showLegend
                    legend="Provider Informations"
                    fieldsetClass="border p-2 border-gray-600 "
                    legendClass="text-white px-2"
                  >
                    <Select
                      label="Choose Provider*"
                      data={getProviders()}
                      onChange={(value: any) =>
                        handletripConfigFormeChange(
                          "provider",
                          value,
                          "provider"
                        )
                      }
                      valueKey="_id"
                      displayKey="company"
                      selected={tripConfigForm?.provider}
                    />
                    <Select
                      label="Choose Vehicle*"
                      data={getVehicles(tripConfigForm?.provider)}
                      onChange={(value: any) =>
                        handletripConfigFormeChange("vehicle", value, "vehicle")
                      }
                      valueKey="_id"
                      displayKey="number"
                      selected={tripConfigForm?.vehicle}
                    />
                    {/* <Input type='text' label="Brand*" placeholder="eg: Tata Moters" value={tripConfigForm?.brand} onChange={(event: any) => handletripConfigFormeChange("brand", event?.target?.value)} /> */}
                  </Fieldset>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-md bg-gray-200 dark:bg-gray-900 px-4 py-2 text-left text-sm font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>Fair Details </span>
                  <BiChevronsDown
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-600 dark:text-gray-200 `}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                  <Fieldset
                    showLegend
                    legend="Layout Informations"
                    fieldsetClass="border p-2 border-gray-600 "
                    legendClass="text-white px-2"
                  >
                    <Input
                      min={0}
                      type="number"
                      label="Per Seat Price*"
                      placeholder="eg: 890.90"
                      value={tripConfigForm?.perSeatPrice}
                      onChange={(event: any) =>
                        handletripConfigFormeChange(
                          "perSeatPrice",
                          +event?.target?.value
                        )
                      }
                    />
                  </Fieldset>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div">
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full flex justify-between rounded-md bg-gray-200 dark:bg-gray-900 px-4 py-2 text-left text-sm font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>Design Layout</span>
                  <BiChevronsDown
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-600 dark:text-gray-200 `}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500 w-full overflow-auto">
                  <div className="w-full">
                    <Fieldset
                      showLegend
                      legend="Layout Informations"
                      fieldsetClass="border p-2 border-gray-600 "
                      legendClass="text-white px-2"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          readOnly
                          classNames="cursor-not-allowed"
                          isHide={!tripId ? true : false}
                          type="number"
                          label="Available Seat*"
                          value={tripConfigForm?.capacity?.availableSeats}
                          // onChange={() => {}}
                        />
                        <Input
                          readOnly={tripId ? true : false}
                          type="number"
                          label="Rows (including gallary)*"
                          placeholder="eg: 5"
                          value={tripConfigForm?.capacity?.rows}
                          onChange={(event: any) =>
                            handletripConfigFormeChange(
                              "rows",
                              +event?.target?.value,
                              "capacity"
                            )
                          }
                        />
                        <Input
                          readOnly={tripId ? true : false}
                          type="number"
                          label="Columns (including gallary)*"
                          placeholder="eg: 5"
                          value={tripConfigForm?.capacity?.columns}
                          onChange={(event: any) =>
                            handletripConfigFormeChange(
                              "columns",
                              +event?.target?.value,
                              "capacity"
                            )
                          }
                        />
                        <Input
                          readOnly={tripId ? true : false}
                          type="number"
                          label="Gallary column*"
                          placeholder="eg: 10"
                          value={tripConfigForm?.capacity?.gallaryColumn}
                          onChange={(event: any) =>
                            handletripConfigFormeChange(
                              "gallaryColumn",
                              +event?.target?.value,
                              "capacity"
                            )
                          }
                        />
                      </div>
                    </Fieldset>
                  </div>
                  <div className="overflow-auto">
                    {tripConfigForm?.capacity?.layout?.map(
                      (row: any[], rowIndex: number) => (
                        <div
                          key={rowIndex}
                          className="flex justify-center items-center gap-4"
                        >
                          {row?.map((col: any, colIndex: number) => (
                            <div key={rowIndex + colIndex}>
                              {/* <SeatingSeat seat={col} /> */}
                              <SeatOptionsCard
                                cardId={rowIndex + colIndex + 1}
                                onClick={(value: string) => {
                                  handleSeatTypeInLayoutClick(
                                    value,
                                    rowIndex,
                                    colIndex
                                  );
                                }}
                              >
                                <SeatingSeat seat={col?.seatStatus} />
                              </SeatOptionsCard>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
        <div className="flex flex-col gap-4">
          <Card
            cardClass="bg-gray-200 dark:bg-gray-800 rounded-md border border-gray-600"
            headerClass="p-2 text-gray-600 dark:text-gray-200 font-semibold border-b border-gray-400 dark:border-gray-600"
            bodyClass="p-2"
            title="Trip Details"
          >
            <KeyValueDisplay
              keyName="Departure Location"
              value={tripConfigForm?.trip?.departureLocation || "NA"}
            />
            <KeyValueDisplay
              keyName="Arrival Location"
              value={tripConfigForm?.trip?.arrivalLocation || "NA"}
            />
            <KeyValueDisplay
              keyName="Departure Date-Time"
              value={
                tripConfigForm?.trip?.departureAt
                  ? getFormattedDate(
                      tripConfigForm?.trip?.departureAt,
                      "MMMM Do YYYY, hh:mm A"
                    )
                  : "NA"
              }
            />
            <KeyValueDisplay
              keyName="Arrival Date-Time"
              value={
                tripConfigForm?.trip?.arrivalAt
                  ? getFormattedDate(
                      tripConfigForm?.trip?.arrivalAt,
                      "MMMM Do YYYY, hh:mm: A"
                    )
                  : "NA"
              }
            />
          </Card>
          <Card
            cardClass="bg-gray-200 dark:bg-gray-800 rounded-md border border-gray-600"
            headerClass="p-2 text-gray-600 dark:text-gray-200 font-semibold border-b border-gray-400 dark:border-gray-600"
            bodyClass="p-2"
            title="Provider Details"
          >
            <KeyValueDisplay
              keyName="Provider"
              value={getProvider(tripConfigForm?.provider)?.company || "NA"}
            />
            <KeyValueDisplay
              keyName="Vehicle"
              value={
                getVehicle(tripConfigForm?.provider, tripConfigForm?.vehicle)
                  ?.number || "NA"
              }
            />
          </Card>
          <Card
            cardClass="bg-gray-200 dark:bg-gray-800 rounded-md border border-gray-600"
            headerClass="p-2 text-gray-600 dark:text-gray-200 font-semibold border-b border-gray-400 dark:border-gray-600"
            bodyClass="p-2"
            title="Fair Layout"
          >
            <KeyValueDisplay
              keyName="Per Seat Price"
              value={tripConfigForm?.perSeatPrice || "NA"}
            />
          </Card>
          <Card
            cardClass="bg-gray-200 dark:bg-gray-800 rounded-md border border-gray-600"
            headerClass="p-2 text-gray-600 dark:text-gray-200 font-semibold border-b border-gray-400 dark:border-gray-600"
            bodyClass="p-2"
            title="Vechicle Layout"
          >
            <KeyValueDisplay
              keyName="Seat Counts"
              value={tripConfigForm?.capacity?.seating || "NA"}
            />
            <KeyValueDisplay
              keyName="Rows"
              value={tripConfigForm?.capacity?.rows || "NA"}
            />
            <KeyValueDisplay
              keyName="Columns"
              value={tripConfigForm?.capacity?.columns || "NA"}
            />
            <KeyValueDisplay
              keyName="Gallary Column"
              value={tripConfigForm?.capacity?.gallaryColumn || "NA"}
            />
          </Card>
          <Card
            cardClass="bg-gray-200 dark:bg-gray-800 rounded-md border border-gray-600"
            bodyClass="p-2"
          >
            <div className="max-h-96- overflow-auto">
              {tripConfigForm?.capacity?.layout?.map(
                (row: any[], rowIndex: number) => (
                  <div
                    key={rowIndex}
                    className="flex justify-center items-center gap-4"
                  >
                    {row?.map((col: any, colIndex: number) => (
                      <div key={rowIndex + colIndex}>
                        <SeatingSeat seat={col.seatStatus} />
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </Card>
        </div>
      </div>
      <div className="flex justify-center items-center my-4">
        <Button
          Icon={BiTrip}
          title={`${tripId ? "Update Trip" : "Create Trip"} `}
          classNames="py-2 px-4 bg-green-400 hover:bg-green-500 text-white font-semibold w-full !justify-center gap-2"
          onClick={() => {
            handleTripConfigClick();
          }}
        />
      </div>
    </Container>
  );
}
