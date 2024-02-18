// import React from "react";
// import PageComponent from "../components/PageComponent";
// import { useStateContext } from "../contexts/ContextProvider";
// import ReservationListItem from "../components/ReservationListItem";
// import TButton from "../components/core/TButton";
// import { PlusCircleIcon } from "@heroicons/react/24/outline";

// export default function Reservation() {
//   const { reservations } = useStateContext();
//   console.log(reservations);

//   const onDeleteClick = () => {
//     console.log("On Delete Click");
//   };

//   return (


//     <PageComponent
//       title="Reservations"
//       buttons={
//         <TButton color="green" to="/reservation/create">
//           <PlusCircleIcon className="h-6 w-6 mr-2" />
//           Schedule Reservation
//         </TButton>
//       }
//     >
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
//         {reservations.map((reservation) => (
//           <ReservationListItem
//             reservation={reservation}
//             key={reservation.id}
//             onDeleteClick={onDeleteClick}
//           />
//         ))}
//       </div>
//     </PageComponent>


//   );


// }

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import ReservationListItem from "../components/ReservationListItem"
import { useStateContext } from "../contexts/ContextProvider";
import PaginationLinks from "../components/PaginationLinks";

export default function Reservation() {
  const { showToast } = useStateContext();
  const [reservations, setReservations] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);

  const onDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      axiosClient.delete(`/reservation/${id}`).then(() => {
        getReservations();
        showToast('The reservation was deleted');
      });
    }
  };

  const onPageClick = (link) => {
    getReservations(link.url);
  };

  const getReservations = (url) => {
    url = url || "/reservation";
    setLoading(true);
    axiosClient.get(url).then(({ data }) => {
      setReservations(data.data);
      setMeta(data.meta);
      setLoading(false);
    });
  };

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <PageComponent
      title="Reservation"
      buttons={
        <TButton color="green" to="/reservation/create">
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          Create new
        </TButton>
      }
    >
      {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
        <div>
          {reservations.length === 0 && (
            <div className="py-8 text-center text-gray-700">
              You don't have reservations created
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {reservations.map((reservation) => (
              <ReservationListItem
                reservation={reservation}
                key={reservation.id}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </div>
          {reservations.length > 0 && <PaginationLinks meta={meta} onPageClick={onPageClick} />}
        </div>
      )}
    </PageComponent>
  );
}
