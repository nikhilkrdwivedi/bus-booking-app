import Loader from "@elements/Loader";

export default function FullScreenLoader({
  show,
  onClick,
  showCloseIcon,
}: FullScreenLoaderType) {
  return show && <Loader onClick={onClick} showCloseIcon={showCloseIcon} />;
}

type FullScreenLoaderType = {
  show?: boolean;
  onClick: () => void;
  showCloseIcon?: boolean;
};
