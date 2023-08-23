import Button from "@elements/Button";

import { AiFillCar } from "react-icons/ai";
export default function Header({ onClick }: HeaderType) {
  return (
    <div className="grid place-items-center justify-items-stretch grid-cols-2 gap-1 py-4 border-b border-gray-600">
      <div className="justify-self-start text-gray-600 dark:text-white font-normal text-lg">
        Vehicles
      </div>
      <div className="justify-self-end">
        <Button
          title="Vehicle"
          iconClass="w-6 h-6"
          Icon={AiFillCar}
          classNames="bg-green-400 hover:bg-green-600 text-gray-800 hover:text-white px-4 py-1 gap-2 font-semibold"
          onClick={onClick}
        />
      </div>
    </div>
  );
}

type HeaderType = {
  onClick: () => void;
};
