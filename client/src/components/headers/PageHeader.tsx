import Button from "@elements/Button";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function PageHeader({
  location = "",
  label,
  showButton,
}: PageHeaderType) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-start items-center p-2 gap-2 my-2 rounded-md bg-gray-200 dark:bg-gray-600">
      {showButton && (
        <Button
          onClick={() => {
            navigate(location);
          }}
          classNames="top-0 left-0 bg-gray-300 dark:bg-gray-800 h-[34px] w-[34px] text-md font-semibold text-gray-600 dark:text-gray-200 "
          Icon={IoReturnUpBackOutline}
          IconSize={28}
        />
      )}

      <span className=" text-md font-semibold text-gray-600 dark:text-gray-200">
        {label}
      </span>
    </div>
  );
}

type PageHeaderType = {
  location?: string;
  showButton?: boolean;
  label?: string;
};
