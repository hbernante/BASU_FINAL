import { ArrowTopRightOnSquareIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import TButton from "./core/TButton";

export default function ReservationListItem({ reservation, onDeleteClick }) {
  return (
    <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
      <img
        src={reservation.image_url}
        alt={reservation.title}
        className="w-full h-48 object-cover"
      />
      <h4 className="mt-4 text-lg font-bold">{reservation.title}</h4>
      <div
        dangerouslySetInnerHTML={{ __html: reservation.description }}
        className="overflow-hidden flex-1"
      ></div>
      <div className="flex justify-between items-center mt-3">
        <TButton to={`/reservations/${reservation.id}`}>
          <PencilIcon className="w-5 h-5 mr-2 " />
          Edit
        </TButton>

        <div className="flex items-center">
          <TButton href={`/view/reservation/${reservation.slug}`} circle link>
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </TButton>

          {reservation.id && (
            <TButton
              onClick={(ev) => onDeleteClick(reservation.id)}
              circle
              link
              color="red"
            >
              <TrashIcon className="w-5 h-5" />
            </TButton>
          )}
        </div>
      </div>
    </div>
  );
}
