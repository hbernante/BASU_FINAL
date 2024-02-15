import React, { useState } from "react";
import RightSideDescription from "./ReservationDescription";
import axios from 'axios';


const ReservationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [passengerNames, setPassengerNames] = useState([""]);
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [selectedShuttle, setSelectedShuttle] = useState("");
  const [hoveredShuttle, setHoveredShuttle] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);


  const reasonsOptions = ["Club Organization", "Field Trip", "Business"];
  const shuttleOptions = [
    { name: "Shuttle A", image: "/images/apc_shuttle_bus.png" },
    { name: "Shuttle B", image: "/images/apc_shuttle_bus1.png" },
    { name: "Shuttle C", image: "/images/apc_shuttle_bus2.png" },
    { name: "Shuttle D", image: "/images/apc_shuttle_bus3.png" },
  ];


  const placeholderImage = "placeholder_image.jpg";

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    // Optionally, you can reset the form state here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      alert('Please enter a valid email with the domain "student.apc.edu.ph".');
      return;
    }

    const reservationData = {
      name,
      email,
      reservation_date: reservationDate,
      passenger_names: passengerNames,
      reason,
      description,
      selected_shuttle: selectedShuttle,
    };

    try {
      // Use Axios to make the POST request
      const response = await axios.post('/reservationdemo', reservationData);

      if (response.status === 200) {
        setShowSummary(true);
        setShowConfirmation(true);
      } else {
        console.error('Failed to submit reservation:', response.statusText);
        // Handle the error as needed
      }
    } catch (error) {
      console.error('Error submitting reservation:', response.error);
      // Handle the error as needed
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@student\.apc\.edu\.ph$/;
    return emailRegex.test(email);
  };

  const handlePassengerNameChange = (index, value) => {
    const updatedPassengerNames = [...passengerNames];
    updatedPassengerNames[index] = value;
    setPassengerNames(updatedPassengerNames);
  };

  const addPassenger = () => {
    setPassengerNames([...passengerNames, ""]);
  };

  const removePassenger = (index) => {
    const updatedPassengerNames = [...passengerNames];
    updatedPassengerNames.splice(index, 1);
    setPassengerNames(updatedPassengerNames);
  };


  return (

    <div className="container mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
      >
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-center lg:text-left text-blue-500">
            Shuttle Reservation Form
          </h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Please use an email with the domain "student.apc.edu.ph".
            </p>
          </div>

          </div>

          <div>
          {/* ... Existing form fields ... */}

          {/* New input field for the reservation date */}
          <div className="mb-4">
            <label
              htmlFor="reservationDate"
              className="block text-sm font-medium text-gray-600"
            >
              Reservation Date
            </label>
            <input
              type="date"
              id="reservationDate"
              selected={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              dateformat="yyyy-MM-dd"
              required
            />
          </div>


          <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-600">
            Reason for Reservation
          </label>
          <select
            id="reason"
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="" disabled>
              Select a reason
            </option>
            {reasonsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>



          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Reservation Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="mt-1 p-2 w-full border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="passengerNames"
            className="block text-sm font-medium text-gray-600"
          >
            Passenger Names
          </label>
          {passengerNames.map((passenger, index) => (
            <div key={index} className="flex items-center mt-1">
              <input
                type="text"
                className="p-2 border rounded-md flex-grow focus:outline-none focus:ring focus:border-blue-300"
                placeholder={`Passenger ${index + 1}`}
                value={passenger}
                onChange={(e) =>
                  handlePassengerNameChange(index, e.target.value)
                }
              />
              <button
                type="button"
                onClick={() => removePassenger(index)}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPassenger}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Add Passenger
          </button>
        </div>

        <div className="mb-4">
          <label
            htmlFor="shuttle"
            className="block text-sm font-medium text-gray-600"
          >
            Select Shuttle
          </label>
          <div className="grid grid-cols-4 gap-4">
            {shuttleOptions.map((shuttle) => (
              <button
                key={shuttle.name}
                type="button"
                className={`p-2 border rounded-md hover:bg-gray-200 focus:outline-none focus:ring focus:border-blue-300 ${
                  (selectedShuttle === shuttle.name ||
                    hoveredShuttle === shuttle.name) &&
                  "bg-gray-200"
                }`}
                onClick={() => setSelectedShuttle(shuttle.name)}
                onMouseEnter={() => setHoveredShuttle(shuttle.name)}
                onMouseLeave={() => setHoveredShuttle(null)}
              >
                {shuttle.name}
              </button>
            ))}
          </div>
          {(selectedShuttle || hoveredShuttle) && (
            <img
              src={
                shuttleOptions.find(
                  (shuttle) =>
                    shuttle.name === (selectedShuttle || hoveredShuttle)
                ).image
              }
              alt={`${selectedShuttle || hoveredShuttle} Image`}
              className="mt-2 w-full h-32 object-cover rounded-md"
            />
          )}
          {!(selectedShuttle || hoveredShuttle) && (
            <img
              src={placeholderImage}
              alt="Placeholder Image"
              className="mt-2 w-full h-32 object-cover rounded-md"
            />
          )}
        </div>


        {showSummary && (
          <div className="mb-4 p-4 border rounded-md bg-gray-100">
            <h3 className="text-xl font-semibold mb-2">Reservation Summary</h3>
            <p className="mb-2">
              <strong>Name:</strong> {name}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {email}
            </p>
            <p className="mb-2">
              <strong>Reservation Date:</strong> {reservationDate}
            </p>
            <p className="mb-2">
              <strong>Reason:</strong> {reason}
            </p>
            <p className="mb-2">
              <strong>Description:</strong> {description}
            </p>
            <p className="mb-2">
              <strong>Passenger Names:</strong> {passengerNames.join(", ")}
            </p>
            <p className="mb-2">
              <strong>Selected Shuttle:</strong> {selectedShuttle}
            </p>
            {/* Add more details if needed */}
          </div>
        )}

        {/* Add the submit button at the middle bottom of the form */}
        {!showSummary && (
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Submit Reservation
            </button>
          </div>
        )}
      </form>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            {/* Modal panel */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {/* Content */}
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Reservation Submitted
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your reservation has been successfully submitted! Thank
                        you for choosing our service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleConfirmationClose}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto p-8 rounded-lg shadow-md">
        {/* Right side descriptions */}
        <RightSideDescription />
        {/* You can add your descriptions or any other content here */}
      </div>
    </div>
  );
};



export default ReservationForm;
