import Button from "@elements/Button";
import Table from "@elements/Table";
import TableRow from "@elements/TableRow";
import TableThead from "@elements/TableThead";
import { getFormattedDate } from "@utils/dates";
import { AiFillCar } from "react-icons/ai";

export default function List({ data, onClick }: any) {
  const thead = () => {
    const headers = [
      { label: "#" },
      { label: "Provider" },
      { label: "Brand" },
      { label: "Number" },
      { label: "Purchase" },
      { label: "Actions" },
    ];
    return <TableThead headers={headers} />;
  };

  const tbody = () => {
    return (
      <>
        {(data || []).map((_: any, index: number) => (
          <TableRow>
            <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
            <td className="whitespace-nowrap px-6 py-4">
              {_?.provider?.company}
            </td>
            <td className="whitespace-nowrap px-6 py-4">{_?.brand}</td>
            <td className="whitespace-nowrap px-6 py-4">{_?.number}</td>
            <td className="whitespace-nowrap px-6 py-4">
              {getFormattedDate(_?.purchase, "MMMM do YYYY")}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <Button
                title="Edit Vehicle"
                iconClass="w-6 h-6"
                Icon={AiFillCar}
                classNames="bg-green-400 hover:bg-green-600 text-gray-800 hover:text-white px-4 py-1 gap-2 font-semibold"
                onClick={() => onClick(_)}
              />
            </td>
          </TableRow>
        ))}
      </>
    );
  };
  return <Table thead={thead()} tbody={tbody()} />;
}
