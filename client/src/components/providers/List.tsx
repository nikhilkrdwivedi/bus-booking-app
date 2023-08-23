import Button from "@elements/Button";
import Table from "@elements/Table";
import TableRow from "@elements/TableRow";
import TableThead from "@elements/TableThead";
import { getFormattedDate } from "@utils/dates";
import { BiSolidEdit } from "react-icons/bi";

export default function List({ data, onClick }: any) {
  const thead = () => {
    const headers = [
      { label: "#" },
      { label: "Name" },
      { label: "Joined" },
      { label: "City" },
      { label: "State" },
      { label: "Zipcode" },
      { label: "email" },
      { label: "Contact" },
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
            <td className="whitespace-nowrap px-6 py-4">{_.company}</td>
            <td className="whitespace-nowrap px-6 py-4">
              {getFormattedDate(_.createdAt)}
            </td>
            <td className="whitespace-nowrap px-6 py-4">{_.address?.city}</td>
            <td className="whitespace-nowrap px-6 py-4">{_.address?.state}</td>
            <td className="whitespace-nowrap px-6 py-4">
              {_.address?.zipcode}
            </td>
            <td className="whitespace-nowrap px-6 py-4">{_.contact?.email}</td>
            <td className="whitespace-nowrap px-6 py-4">{_.contact?.phone}</td>
            <td className="whitespace-nowrap px-6 py-4">
              <Button
                title="Proivder"
                iconClass="w-6 h-6"
                classNames="bg-green-400 hover:bg-green-600 text-gray-800 hover:text-white px-4 py-1 gap-2 font-semibold"
                Icon={BiSolidEdit}
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
