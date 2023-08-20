/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Header from "@components/headers/Header";
import MobileHeader from "@components/headers/MobileHeader";

export default function TopHeaderWrapper({ children }) {
  return (
    <div className="flex flex-col h-screen overflow-auto dark:bg-gray-900">
      <Header />
      <MobileHeader />
      {children}
    </div>
  );
}
