/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLottie } from "lottie-react";
const LottieAnimationWrapper = ({
  animationData,
  lottieClass,
  loop = true,
}: LottieAnimationWrapperType) => {
  const options = {
    animationData,
    loop,
  };
  const style = {
    height: "100%",
    // border: 3,
    // borderStyle: "solid",
    // borderRadius: 7,
    // backgroundColor: 'red'
  };

  const { View } = useLottie(options, style);

  return <div className={lottieClass}>{View}</div>;
};

type LottieAnimationWrapperType = {
  animationData: any;
  lottieClass: string;
  loop?: boolean;
};

export default LottieAnimationWrapper;
