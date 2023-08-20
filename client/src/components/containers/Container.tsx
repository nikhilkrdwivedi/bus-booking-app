import { ReactNode } from "react";

export default function Container({ children, className }:ContainerType) {
  return <div className={"w-full " + className}>{children}</div>;
}

type ContainerType = {
  children: ReactNode,
  className: string,
}
