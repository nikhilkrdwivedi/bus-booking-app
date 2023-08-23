/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@components/containers/Container";
import Pagination from "@components/paginations/Pagination";
import Header from "@components/vehicles/Header";
import List from "@components/vehicles/List";

import { useTheme } from "@contexts/ThemeContext";
import { fetchVehicles } from "@data/rest/vehicle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Vechicles() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<any>({});
  const [pagination, setPagination] = useState({
    currentPage: 0,
  });
  useEffect(() => {
    fetchProviders();
  }, [pagination]);
  const fetchProviders = async () => {
    try {
      const { data } = await fetchVehicles(pagination);
      // console.log({ data });
      setVehicles({ data: data.data, pagination: data?.pagination });
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
        <Header onClick={() => navigate("/vehicle-config")} />
        <List
          data={vehicles.data}
          onClick={(vehicle: any) =>
            navigate("/vehicle-config", { state: vehicle })
          }
        />
        {vehicles?.pagination?.totalRecords && (
          <Pagination
            page={vehicles?.pagination?.currentPage + 1}
            pages={vehicles?.pagination?.totalPages}
            total={vehicles?.pagination?.totalRecords}
            perPage={vehicles?.pagination?.limit}
            showCount
            className="bottom-0 sticky"
            onPageClick={(requiredPage: number) => {
              console.log({ requiredPage });
              setPagination({ currentPage: requiredPage - 1 });
            }}
          />
        )}
        <Pagination
          page={vehicles?.pagination?.currentPage + 1}
          pages={vehicles?.pagination?.totalPages}
          total={vehicles?.pagination?.totalRecords}
          perPage={vehicles?.pagination?.limit}
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
