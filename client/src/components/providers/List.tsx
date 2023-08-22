import Button from "@elements/Button";
import Table from "@elements/Table";
import TableRow from "@elements/TableRow";
import TableThead from "@elements/TableThead";

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
            <td className="whitespace-nowrap px-6 py-4">{_.createdAt}</td>
            <td className="whitespace-nowrap px-6 py-4">{_.address?.city}</td>
            <td className="whitespace-nowrap px-6 py-4">{_.address?.state}</td>
            <td className="whitespace-nowrap px-6 py-4">
              {_.address?.zipcode}
            </td>
            <td className="whitespace-nowrap px-6 py-4">{_.contact?.email}</td>
            <td className="whitespace-nowrap px-6 py-4">{_.contact?.phone}</td>
            <td className="whitespace-nowrap px-6 py-4">
              <Button
                title="Action"
                classNames="px-4 py-1 bg-green-400 w-24"
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
