/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from "@elements/Button";
import { BiTrip } from "react-icons/bi";

export default function Header({ showModal }: HeaderType) {
  return (
    <div className="grid place-items-center justify-items-stretch grid-cols-2 gap-1 py-4 border-b border-gray-600">
      <div className="justify-self-start text-gray-600 dark:text-white font-normal text-lg">
        Trip Planner
      </div>
      <div className="justify-self-end">
        <Button
          Icon={BiTrip}
          iconClass="w-6 h-6"
          title="Create Trip"
          classNames="bg-green-400 font-semibold px-4 py-1 w-auto gap-2  text-gray-600"
          onClick={showModal}
        />
      </div>
    </div>
  );
}

type HeaderType = {
  showModal: () => void;
};
