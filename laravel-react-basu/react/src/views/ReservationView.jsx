import { useState } from "react";
import PageComponent from "../components/PageComponent";
import { PhotoIcon } from "@heroicons/react/24/outline";
import TButton from "../components/core/TButton";
import axiosClient from "..//axios.js";
import { Navigate, useNavigate } from "react-router-dom";
import ReservationQuestions from "../components/ReservationQuestions.jsx";

export default function ReservationView() {
  const navigate = useNavigate();

  const [reservation, setReservation] = useState({
    title: "",
    slug: "",
    status: false,
    description: "",
    image: null,
    image_url: null,
    expire_date: "",
    questions: [],
  });
  const [error, setError] = useState("");

  const onImageChoose = (ev) => {
    const file = ev.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setReservation({
        ...reservation,
        image: file,
        image_url: reader.result,
      });

      ev.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = { ...reservation };
    if (payload.image) {
      payload.image = payload.image_url;
    }
    delete payload.image_url;
    axiosClient
      .post("/reservation", payload)
      .then((res) => {
        console.log(res);
        navigate("/reservation");
      })
      .catch((err) => {
        if (err && err.response) {
          setError(err.response.data.message);
        }
        console.log(err, err.response);
      });

    //Dummy Data for Debugging
    // axiosClient.post('reservation', {
    //   title: 'Lorem Ipsum',
    //   description: 'Test',
    //   expire_date: '2024-08-01',
    //   status: true,
    //   questions: []
    // })
  };

  function onReservationUpdate(reservation) {
    setReservation({ ...reservation });
  }

  return (
    <PageComponent title="Create Reservation">
      <form action="#" method="POST" onSubmit={onSubmit}>
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            {error && (
              <div className="bg-red-500 text-white py-3 px-3 rounded-lg">
                {error}
              </div>
            )}
            {/*Image*/}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Photo
              </label>
              <div className="mt-1 flex items-center">
                {reservation.image_url && (
                  <img
                    src={reservation.image_url}
                    alt=""
                    className="w-32 h-32 object-cover"
                  />
                )}
                {!reservation.image_url && (
                  <span className="flex justify-center  items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                    <PhotoIcon className="w-8 h-8" />
                  </span>
                )}
                <button
                  type="button"
                  className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <input
                    type="file"
                    className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                    onChange={onImageChoose}
                  />
                  Change
                </button>
              </div>
            </div>
            {/*Image*/}

            {/*Title*/}
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Reservation Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={reservation.title}
                onChange={(ev) =>
                  setReservation({ ...reservation, title: ev.target.value })
                }
                placeholder=""
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <small className="text-red-500">{error}</small>
            </div>
            {/*Title*/}

            {/*Description*/}
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              {/* <pre>{ JSON.stringify(reservation, undefined, 2) }</pre> */}
              <textarea
                name="description"
                id="description"
                value={reservation.description || ""}
                onChange={(ev) =>
                  setReservation({
                    ...reservation,
                    description: ev.target.value,
                  })
                }
                placeholder="Describe your reservation"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            {/*Description*/}

            {/*Expire Date*/}
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="expire_date"
                className="block text-sm font-medium text-gray-700"
              >
                Reservation Date
              </label>
              <input
                type="date"
                name="expire_date"
                id="expire_date"
                value={reservation.expire_date}
                onChange={(ev) =>
                  setReservation({
                    ...reservation,
                    expire_date: ev.target.value,
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <small className="text-red-500">{error}</small>
            </div>
            {/*Expire Date*/}

            {/*Active*/}
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="status"
                  name="status"
                  type="checkbox"
                  checked={reservation.status}
                  onChange={(ev) =>
                    setReservation({
                      ...reservation,
                      status: ev.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="comments" className="font-medium text-gray-700">
                  Active
                </label>
                <p className="text-gray-500">
                  Whether to make reservation publicly available
                </p>
              </div>
            </div>
            {/*Active*/}

            <ReservationQuestions
              reservation={reservation}
              onReservationUpdate={onReservationUpdate}
            />

            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <TButton>Save</TButton>
            </div>
          </div>
        </div>
      </form>
    </PageComponent>
  );
}
