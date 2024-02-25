import React, { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/TButton";
import {
  ArrowUturnLeftIcon
} from "@heroicons/react/24/outline";
import FormFields from "../components/core/FormFields";
import FormSubmit from "../components/core/FormSubmit";

export default function AccountRegister() {
  const [role, setRole] = useState("");
  const [error, setError] = useState({ __html: "" });
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmissionError = (error) => {
    if (error.response && error.response.status !== 409) {
      // Axios error with response (e.g., status code 4xx or 5xx), excluding 409 (conflict)
      console.error("Axios error:", error.response.data);
      setError({ __html: error.response.data.message || "An error occurred." });
    } else if (error.request) {
      // Axios error without response (e.g., no response received)
      console.error("Axios error:", error.request);
      setError({ __html: "No response received from the server." });
    } else {
      // Other errors (e.g., network error, HTML validation error)
      console.error("Error:", error.message);
      setError({ __html: error.message || "An error occurred." });
    }
  };

  return (
    <PageComponent
      title="Account Registration"
      buttons={
        <TButton color="indigo" to="/account">
          <ArrowUturnLeftIcon className="h-6 w-6 mr-2" />
          Back to Account List
        </TButton>
      }
    >
      <div
        className={`pt-3 pb-3 ${
          loading ? "opacity-0" : "transition-opacity duration-1000 opacity-100"
        }`}
      >
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
              onChange={(e) => setRole(e.target.value)}
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
              onChange={(e) => setRole(e.target.value)}
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
        <div
          className={`container mx-auto px-2 ${
            loading
              ? "opacity-0"
              : "transition-opacity duration-1000 opacity-100"
          }`}
        >
          <form className="flex flex-col space-y-4">
            <FormFields
              formData={formData}
              handleChange={handleChange}
              role={role}
            />
            <FormSubmit
              formData={formData}
              role={role}
              setError={setError}
              setShowNotification={setShowNotification}
              setFormData={setFormData}
              handleSubmissionError={handleSubmissionError}
            />
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
            Registration successful.
          </span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setShowNotification(false)}
          >
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a.5.5 0 0 1-.708 0l-4.95-4.95-4.95 4.95a.5.5 0 1 1-.708-.708l4.95-4.95-4.95-4.95a.5.5 0 1 1 .708-.708l4.95 4.95 4.95-4.95a.5.5 0 0 1 .708.708z" />
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
