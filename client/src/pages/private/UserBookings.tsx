import Container from "@components/containers/Container";
import PageHeader from "@components/headers/PageHeader";
import React from "react";

export default function UserBookings() {
  return (
    <Container className="px-2 md:px-4 lg:px-20 xl:px-32 bg-white dark:bg-gray-800 w-full h-screen overflow-auto">
      <PageHeader showButton label="Your Bookings" location="/" />
    </Container>
  );
}
