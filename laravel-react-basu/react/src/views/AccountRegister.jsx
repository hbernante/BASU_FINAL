import React, { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/TButton";
import { Link } from "react-router-dom";
import { registerUser } from "../axios";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function AccountRegister() {
  const [role, setRole] = useState("");
  const [error, setError] = useState({ __html: "" });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [showNotification, setShowNotification] = useState(false);

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (showNotification) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000); // Update countdown every second

      // Clear interval when component unmounts or when countdown reaches 0
      return () => clearInterval(timer);
    }
  }, [showNotification]);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ __html: "" }); // Clear previous errors
    try {
      // Add role to formData
      const userData = { ...formData, role };
      // Call registerUser function with userData
      const response = await registerUser(userData);

      setShowNotification(true);

      // Reset formData to clear the form inputs
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
      });

      setTimeout(() => {
        window.location.href = "/account";
      }, 5000);
    } catch (error) {
      console.error("Registration failed:", error); // handle registration error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError({ __html: error.response.data.message }); // Set error message
      } else {
        setError({ __html: "Credentials Already Taken." }); // Set generic error message
      }
    }
  };

  return (
    <PageComponent title="Account Registration"
      buttons={
        <TButton color="green" to="/account">
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          Back to Account List
        </TButton>
      }
    >
      <div className="pt-3 pb-3">
        <label
          htmlFor="roles"
          className="text-2xl font-bold mb-2 flex justify-center"
        >
          ROLE:
        </label>
        <div className="flex items-center justify-center space-x-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="student"
              name="roles"
              value="student"
              checked={role === "student"}
              onChange={handleRoleChange}
              className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <label htmlFor="student" className="text-sm font-medium">
              Student
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="driver"
              name="roles"
              value="driver"
              checked={role === "driver"}
              onChange={handleRoleChange}
              className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <label htmlFor="driver" className="text-sm font-medium">
              Driver
            </label>
          </div>
        </div>
        {role === "" && (
          <h1 className="text-sm mt-2 flex justify-center py-5 px-5">
            Select an account Role to proceed to its registration.
          </h1>
        )}
      </div>

      {(role === "student" || role === "driver") && (
        <div className="container mx-auto px-2">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName} // bind value to state
                onChange={handleChange} // handle change event
                className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName} // bind value to state
                onChange={handleChange} // handle change event
                className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email} // bind value to state
                onChange={handleChange} // handle change event
                className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {role === "driver" && (
              <div className="flex flex-col space-y-2">
                <label htmlFor="phoneNumber" className="text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber} // bind value to state
                  onChange={handleChange} // handle change event
                  className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            <div className="flex flex-col space-y-1">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                value={formData.password} // bind value to state
                onChange={handleChange} // handle change event
                className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="items-center px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none"
            >
              Sign Up
            </button>
          </form>
        </div>
      )}
      {showNotification && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative m-10"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">
            {" "}
            Registration successful, redirecting in {countdown} seconds.
          </span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={closeNotification}
          >
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a.5.5 0 0 1-.708 0l-4.95-4.95-4.95 4.95a.5.5 0 1 1-.708-.708l4.95-4.95-4.95-4.95a.5.5 0 1 1 .708-.708l4.95 4.95 4.95-4.95a.5.5 0 0 1 .708.708l-4.95 4.95 4.95 4.95a.5.5 0 0 1 0 .708z" />
            </svg>
          </span>
        </div>
      )}

      {error.__html && (
        <div
          className="bg-red-500 rounded py-2 px-3 text-white text-center m-10"
          dangerouslySetInnerHTML={error}
        ></div>
      )}
    </PageComponent>
  );
}
