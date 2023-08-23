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
import { createVehicle, fetchVehicle, updateVehicle } from "@data/rest/vehicle";
import { Disclosure } from "@headlessui/react";
import { useEffect, useState } from "react";
import { BiChevronsDown } from "react-icons/bi";
import { toast } from "react-toastify";
import { useTheme } from "@contexts/ThemeContext";
import { useLocation } from "react-router-dom";
import { getDisplayValue } from "@utils/displayValue";
import moment from "moment";
import PageHeader from "@components/headers/PageHeader";
export default function VehicleConfig() {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  // console.log({ location });
  const vehicleId = location?.state?._id || "";
  // const { state:{_id } } = location;
  // // console.log({state})
  const fetchVehicleConfig = async (id: string) => {
    try {
      const { data } = await fetchVehicle(id);
      // console.log({ data: data.data });
      setVehicleConfigForm(data.data);
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "Operation Failed!";
      toast(errorMsg, {
        type: "error",
        theme: isDarkMode ? "dark" : "light",
      });
    }
  };
  useEffect(() => {
    if (vehicleId.length) {
      fetchVehicleConfig(vehicleId);
    }
  }, [vehicleId]);
  const [vehicleConfigForm, setVehicleConfigForm] = useState<any>({
    brand: "",
    purchase: "",
    capacity: {
      columns: 0,
      rows: 0,
      gallaryColumn: 0,
      // seating: 0,
    },
  });

  const [providers, setProviders] = useState<any>({});
  function mergeLayouts(matrix: any[], layout: any[], defaultValue: any) {
    const result = [];

    for (let i = 0; i < matrix.length; i++) {
      const mergedRow = [];
      for (let j = 0; j < matrix[i].length; j++) {
        if (
          layout[i] &&
          layout[i][j] !== undefined &&
          layout[i][j]["seatStatus"] !== "G" &&
          matrix[i] &&
          matrix[i][j] !== undefined &&
          matrix[i][j]["seatStatus"] !== "G"
        ) {
          console.log("layout[i][j] ", layout[i][j]);
          mergedRow.push(layout[i][j]);
        } else if (
          matrix[i] &&
          matrix[i][j] !== undefined
          // &&
          // layout1[i][j]["seatStatus"] == "G"
        ) {
          console.log("matrix[i][j] ", matrix[i][j]);
          mergedRow.push(matrix[i][j]);
        } else {
          console.log("defaultValue ", defaultValue);
          mergedRow.push(defaultValue);
        }
      }
      console.log({ mergedRow });
      result.push(mergedRow);
    }
    // console.log(result);
    return result;
  }
  const renderSeats = () => {
    const { capacity: { columns, rows, gallaryColumn, layout } = {} } =
      vehicleConfigForm ?? {};
    if (columns < 1 || rows < 1) {
      setVehicleConfigForm((prev: any) => ({
        ...prev,
        capacity: {
          ...prev.capacity,
          layout: [],
        },
      }));
      return;
    }
    // Initialize an empty seat matrix
    // console.log({ gallaryColumn, layout });
    const matrix = new Array(rows).fill("").map((_, index) => {
      const array = new Array(columns).fill({ seatStatus: "A" });
      if (index < rows - 1) {
        array[gallaryColumn] = { seatStatus: "G" };
      }
      return array;
    });
    console.log({ matrix, layout });

    const _layout = mergeLayouts(matrix, layout, { seatStatus: "A" });
    console.log({ _layout });
    setVehicleConfigForm((prev: any) => ({
      ...prev,
      capacity: {
        ...prev.capacity,
        layout: _layout,
      },
    }));
  };
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
    } = vehicleConfigForm;
    layout[rowIndex][colIndex] = { seatStatus: type };
    setVehicleConfigForm((prev: any) => ({
      ...prev,
      capacity: {
        ...prev.capacity,
        layout,
      },
    }));
  };
  const handleVehicleClick = async () => {
    // console.log({ vehicleConfigForm });
    try {
      // console.log({ vehicleConfigForm });
      const payload = JSON.parse(JSON.stringify(vehicleConfigForm));
      const { _id } = payload;
      // console.log({ _id });
      let method: any = createVehicle;
      if (_id) {
        delete payload["_id"];
        method = updateVehicle;
      }
      // console.log({ payload });
      await method(payload, _id);
      toast("Your changes have been saved.", {
        type: "success",
        theme: isDarkMode ? "dark" : "light",
      });
    } catch (error: any) {
      // console.log({ error });
      const errorMsg = error?.response?.data?.message || "Operation Failed!";
      toast(errorMsg, {
        type: "error",
        theme: isDarkMode ? "dark" : "light",
      });
    }
  };
  const handleVehicleConfigFormeChange = (
    key: string,
    value: any,
    identifier?: string
  ) => {
    // console.log({ key, value, identifier });
    if (identifier === "capacity") {
      setVehicleConfigForm((prev: any) => ({
        ...prev,
        capacity: {
          ...prev.capacity,
          [key]: value,
        },
      }));
    } else if (identifier === "provider") {
      // setSelectedProvider(value)
      setVehicleConfigForm((prev: any) => ({
        ...prev,
        [key]: value,
      }));
    } else {
      setVehicleConfigForm((prev: any) => ({
        ...prev,
        [key]: value,
      }));
    }
    // console.log({ vehicleConfigForm });
  };

  useEffect(() => {
    fetchProviders();
  }, []);
  useEffect(() => {
    renderSeats();
  }, [
    vehicleConfigForm?.capacity?.rows,
    vehicleConfigForm?.capacity?.columns,
    vehicleConfigForm?.capacity?.gallaryColumn,
  ]);
  return (
    <Container className="px-2 md:px-4 lg:px-20 xl:px-32 dark:bg-gray-800 w-full h-screen overflow-auto">
      <PageHeader showButton label="Manage Vehicle" location="/vehicles" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2 md:my-4 text-gray-600 dark:text-gray-200">
        <div className="flex flex-col gap-4">
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
                      data={providers?.data}
                      onChange={(value: any) =>
                        handleVehicleConfigFormeChange(
                          "provider",
                          value,
                          "provider"
                        )
                      }
                      valueKey="_id"
                      displayKey="company"
                      selected={vehicleConfigForm?.provider}
                    />
                  </Fieldset>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-md bg-gray-200 dark:bg-gray-900 px-4 py-2 text-left text-sm font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>Basic Details </span>
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
                      type="text"
                      label="Brand*"
                      placeholder="eg: Tata Moters"
                      value={vehicleConfigForm?.brand}
                      onChange={(event: any) =>
                        handleVehicleConfigFormeChange(
                          "brand",
                          event?.target?.value
                        )
                      }
                    />
                    <Input
                      type="text"
                      label="Info*"
                      placeholder="eg: Bharat Benz A/C Sleeper (2+1)"
                      value={vehicleConfigForm?.info}
                      onChange={(event: any) =>
                        handleVehicleConfigFormeChange(
                          "info",
                          event?.target?.value
                        )
                      }
                    />
                    <Input
                      type="text"
                      label="Vehicle number*"
                      placeholder="eg: BH-21-MH-0980"
                      value={vehicleConfigForm?.number}
                      onChange={(event: any) =>
                        handleVehicleConfigFormeChange(
                          "number",
                          event?.target?.value
                        )
                      }
                    />
                    <Input
                      max={moment().format("YYYY-MM-DD")}
                      type="date"
                      label="Purchase Date*"
                      placeholder="eg: Tata Moters"
                      value={vehicleConfigForm?.purchase}
                      onChange={(event: any) =>
                        handleVehicleConfigFormeChange(
                          "purchase",
                          event?.target?.value
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
                          min={0}
                          type="number"
                          label="Seat Counts*"
                          placeholder="eg: 10"
                          value={
                            vehicleConfigForm?.capacity?.availableSeats || null
                          }
                          onChange={(event: any) =>
                            handleVehicleConfigFormeChange(
                              "availableSeats",
                              +event?.target?.value,
                              "capacity"
                            )
                          }
                        />
                        <Input
                          min={0}
                          type="number"
                          label="Rows (including gallary)*"
                          placeholder="eg: 5"
                          value={vehicleConfigForm?.capacity?.rows || null}
                          onChange={(event: any) =>
                            handleVehicleConfigFormeChange(
                              "rows",
                              +event?.target?.value,
                              "capacity"
                            )
                          }
                        />
                        <Input
                          min={0}
                          type="number"
                          label="Columns (including gallary)*"
                          placeholder="eg: 5"
                          value={vehicleConfigForm?.capacity?.columns || null}
                          onChange={(event: any) =>
                            handleVehicleConfigFormeChange(
                              "columns",
                              +event?.target?.value,
                              "capacity"
                            )
                          }
                        />
                        <Input
                          min={0}
                          max={vehicleConfigForm?.capacity?.columns - 1 ?? null}
                          type="number"
                          label="Gallary column*"
                          placeholder="eg: 10"
                          value={
                            vehicleConfigForm?.capacity?.gallaryColumn || null
                          }
                          onChange={(event: any) =>
                            handleVehicleConfigFormeChange(
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
                    {vehicleConfigForm?.capacity?.layout?.map(
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
            headerClass="p-2 text-gray-600 dark:text-gray-200 font-semibold border-b border-gray-400 dark:border-gray-200"
            bodyClass="p-2"
            title="Provider Details"
          >
            <KeyValueDisplay
              keyName="Provider"
              value={
                getDisplayValue(
                  providers?.data,
                  vehicleConfigForm?.provider,
                  "company"
                ) || "NA"
              }
            />
          </Card>
          <Card
            cardClass="bg-gray-200 dark:bg-gray-800 rounded-md border border-gray-600"
            headerClass="p-2 text-gray-600 dark:text-gray-200 font-semibold border-b border-gray-400 dark:border-gray-200"
            bodyClass="p-2"
            title="Basic Details"
          >
            <KeyValueDisplay
              keyName="Brand"
              value={vehicleConfigForm?.brand || "NA"}
            />
            <KeyValueDisplay
              keyName="Info"
              value={vehicleConfigForm?.info || "NA"}
            />
            <KeyValueDisplay
              keyName="Number"
              value={vehicleConfigForm?.number || "NA"}
            />
            <KeyValueDisplay
              keyName="Purchase Date"
              value={vehicleConfigForm?.purchase || "NA"}
            />
          </Card>
          <Card
            cardClass="bg-gray-200 dark:bg-gray-800 rounded-md border border-gray-600"
            headerClass="p-2 text-gray-600 dark:text-gray-200 font-semibold border-b border-gray-400 dark:border-gray-200"
            bodyClass="p-2"
            title="Vechicle Layout"
          >
            {vehicleConfigForm?.capacity?.availableSeats && (
              <KeyValueDisplay
                keyName="Seat Counts"
                value={vehicleConfigForm?.capacity?.availableSeats || "NA"}
              />
            )}

            <KeyValueDisplay
              keyName="Rows"
              value={vehicleConfigForm?.capacity?.rows || "NA"}
            />
            <KeyValueDisplay
              keyName="Columns"
              value={vehicleConfigForm?.capacity?.columns || "NA"}
            />
            <KeyValueDisplay
              keyName="Gallary Column"
              value={vehicleConfigForm?.capacity?.gallaryColumn || "NA"}
            />
          </Card>
          <Card
            cardClass="bg-gray-200 dark:bg-gray-800 rounded-md border border-gray-600"
            bodyClass="p-2"
          >
            <div className="max-h-96- overflow-auto">
              {vehicleConfigForm?.capacity?.layout?.map(
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
          title="Save Vechicle"
          classNames="py-2 px-4 bg-green-400 hover:bg-green-500 text-white font-semibold w-full"
          onClick={() => {
            handleVehicleClick();
          }}
        />
      </div>
    </Container>
  );
}
