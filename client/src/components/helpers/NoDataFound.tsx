/* eslint-disable @typescript-eslint/no-explicit-any */
import LottieAnimationWrapper from "@components/lottie-animations/LottieAnimationWrapper";
import noDataFoundJson from "@assets/lottie-json/noDataFound.json";
export default function NoDataFound({
  loading,
  data = [],
  description = "Looks like buses went on vacation without telling us",
  subDescription = "Kindly hold on for the live journey.",
}: NoDataFoundType) {
  return (
    !loading &&
    data?.length < 1 && (
      <div className="flex justify-center items-center flex-col gap-4">
        <LottieAnimationWrapper
          lottieClass="h-72 md:h-96"
          animationData={noDataFoundJson}
        />
        <div className="text-center text-2xl font-bold text-gray-600 dark:text-gray-200 ">
          {description}
        </div>
        <div className="text-center text-lg font-semibold text-gray-400 dark:text-gray-400 ">
          {subDescription}
        </div>
      </div>
    )
  );
}

type NoDataFoundType = {
  loading: boolean;
  data: any[];
  description?: string;
  subDescription?: string;
};
