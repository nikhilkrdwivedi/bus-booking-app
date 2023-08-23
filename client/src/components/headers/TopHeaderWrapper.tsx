/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import Header from "@components/headers/Header";
import MobileHeader from "@components/headers/MobileHeader";

export default function TopHeaderWrapper({ children }: any) {
  return (
    <div className="flex flex-col h-screen overflow-auto dark:bg-gray-900">
      <Header />
      <MobileHeader />
      {children}
    </div>
  );
}
