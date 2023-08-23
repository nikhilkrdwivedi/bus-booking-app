/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@components/containers/Container";
import NoDataFound from "@components/helpers/NoDataFound";
import FullScreenLoader from "@components/loaders/FullScreenLoader";
import Pagination from "@components/paginations/Pagination";
import Header from "@components/providers/Header";
import List from "@components/providers/List";
import ProviderModal from "@components/providers/ProviderModal";
import { useTheme } from "@contexts/ThemeContext";
import { create, fetch, update } from "@data/rest/providers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Providers() {
  const { isDarkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>({});
  const [providers, setProviders] = useState<any>({});
  const [pagination, setPagination] = useState({
    currentPage: 0,
  });

  useEffect(() => {
    setLoading(true);
    fetchProviders();
  }, [pagination]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = (provider: any = {}) => {
    setSelectedProvider(provider);
    setShowModal(true);
  };

  const fetchProviders = async () => {
    try {
      const { data } = await fetch(pagination);
      setProviders({ data: data.data, pagination: data?.pagination });
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

  const handleProviderClick = async () => {
    try {
      // console.log({ selectedProvider });
      const payload = JSON.parse(JSON.stringify(selectedProvider));
      const { _id } = payload;
      // console.log({ _id });
      let method: any = create;
      if (_id) {
        delete payload["_id"];
        method = update;
      }
      // console.log({ payload });
      await method(payload, _id);
      toast("Your changes have been saved.", {
        type: "success",
        theme: isDarkMode ? "dark" : "light",
      });
      fetchProviders();
      setShowModal(false);
    } catch (error: any) {
      // console.log({ error });
      const errorMsg = error?.response?.data?.message || "Operation Failed!";
      toast(errorMsg, {
        type: "error",
        theme: isDarkMode ? "dark" : "light",
      });
    }
  };

  const handleSelectedProviderChange = (
    value: string,
    key: string,
    identifier: string
  ) => {
    if (identifier === "address") {
      setSelectedProvider((prev: any) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else if (identifier === "contact") {
      setSelectedProvider((prev: any) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [key]: value,
        },
      }));
    } else {
      setSelectedProvider((prev: any) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  return (
    <Container className="px-2 md:px-4 lg:px-20 xl:px-32 dark:bg-gray-800 w-full">
      <Header showModal={() => handleShowModal()} />
      <NoDataFound loading={loading} data={providers.data} />
      <FullScreenLoader
        show={loading}
        showCloseIcon
        onClick={() => setLoading(false)}
      />
      {providers?.data && (
        <div className="flex flex-col h-[calc(100vh-130px)] justify-between">
          <div className="overflow-auto">
            <List
              data={providers.data}
              onClick={(provider: any) => handleShowModal(provider)}
            />
          </div>

          <Pagination
            page={providers?.pagination?.currentPage + 1}
            pages={providers?.pagination?.totalPages}
            total={providers?.pagination?.totalRecords}
            perPage={providers?.pagination?.limit}
            showCount
            onPageClick={(requiredPage: number) => {
              console.log({ requiredPage });
              setPagination({ currentPage: requiredPage - 1 });
            }}
          />
        </div>
      )}
      <ProviderModal
        show={showModal}
        hideModal={() => handleCloseModal()}
        form={selectedProvider}
        onChange={(value: string, key: string, identifier: string) =>
          handleSelectedProviderChange(value, key, identifier)
        }
        onClick={() => handleProviderClick()}
      />
    </Container>
  );
}
