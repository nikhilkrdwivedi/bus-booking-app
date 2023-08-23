import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import LottieAnimationWrapper from "@components/lottie-animations/LottieAnimationWrapper";
import noDataFoundJson from "@assets/lottie-json/pageNotFound.json";
import Button from "@elements/Button";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center flex-col gap-4 h-screen bg-gray-200 dark:bg-gray-900">
      <Button
        onClick={() => {
          navigate("/");
        }}
        classNames="!fixed top-0 left-0 m-4 md:m-12 bg-gray-200 dark:bg-gray-800 h-[34px] w-[34px] text-gray-400 dark:text-gray-600  "
        Icon={IoReturnUpBackOutline}
        IconSize={28}
      />
      <LottieAnimationWrapper
        lottieClass="h-72 md:h-96"
        animationData={noDataFoundJson}
      />
      <div className="text-center text-2xl font-bold text-gray-600 dark:text-gray-200 ">
        "Oops! Looks like this page took a wrong turn at the binary crossroads."
      </div>
      <div className="text-center text-4xl font-semibold text-gray-400 dark:text-gray-400 ">
        Page Not Found
      </div>
    </div>
  );
}
