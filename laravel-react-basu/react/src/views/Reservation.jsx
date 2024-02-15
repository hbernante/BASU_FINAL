import React from "react";
import PageComponent from "../components/PageComponent";
import { useStateContext } from "../contexts/ContextProvider";
import ReservationListItem from "../components/ReservationListItem";
import TButton from "../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function Reservation() {
  const { reservations } = useStateContext();
  console.log(reservations);

  const onDeleteClick = () => {
    console.log("On Delete Click");
  };

  return (


    <PageComponent
      title="Reservations"
      buttons={
        <TButton color="green" to="/reservation/create">
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          Schedule Reservation
        </TButton>
      }
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {reservations.map((reservation) => (
          <ReservationListItem
            reservation={reservation}
            key={reservation.id}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </div>
    </PageComponent>


  );


}
