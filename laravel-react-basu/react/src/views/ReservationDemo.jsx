import React from "react";
import PageComponent from "../components/PageComponent";
import ReservationForm from "./ReservationForm";

export default function ReservationDemo() {
  return (
    <PageComponent title="Reservation Demo">
      <div className="App">
      <ReservationForm />
      </div>
    </PageComponent>
  );
}
