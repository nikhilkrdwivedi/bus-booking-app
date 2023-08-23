import Button from "@elements/Button";
import Input from "@elements/Input";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";

export default function Header({ showModal }: any) {
  return (
    <div className="grid place-items-center justify-items-stretch grid-cols-2 gap-1 py-4 border-b border-gray-600">
      <div className="justify-self-start text-gray-600 dark:text-white font-normal text-lg">
        Providers
      </div>
      {/* <div className="w-full">
        <Input type="text" placeholder="Search by  name" />
      </div> */}
      <div className="justify-self-end">
        <Button
          title="Provider"
          iconClass="w-6 h-6"
          Icon={FaUserPlus}
          classNames="bg-green-400 hover:bg-green-600 text-gray-800 hover:text-white px-4 py-1 gap-2 font-semibold"
          onClick={showModal}
        />
      </div>
    </div>
  );
}
