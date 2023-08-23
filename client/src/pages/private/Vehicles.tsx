/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@components/containers/Container";
import NoDataFound from "@components/helpers/NoDataFound";
import FullScreenLoader from "@components/loaders/FullScreenLoader";
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
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
  });

  useEffect(() => {
    setLoading(true);
    fetchProviders();
  }, [pagination]);

  const fetchProviders = async () => {
    try {
      const { data } = await fetchVehicles(pagination);
      setVehicles({ data: data.data, pagination: data?.pagination });
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
      <Header onClick={() => navigate("/vehicle-config")} />
      <NoDataFound loading={loading} data={vehicles.data} />
      <FullScreenLoader
        show={loading}
        showCloseIcon
        onClick={() => setLoading(false)}
      />
      {vehicles?.data && (
        <div className="flex flex-col h-[calc(100vh-130px)]  justify-between">
          <div className="overflow-auto">
            <List
              data={vehicles.data}
              onClick={(vehicle: any) =>
                navigate("/vehicle-config", { state: vehicle })
              }
            />
          </div>
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
      )}
    </Container>
  );
}
