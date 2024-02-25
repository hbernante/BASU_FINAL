// FormSubmit.js
import React, { useState } from "react";
import { registerUser } from "../../axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

export default function FormSubmit({ formData, role, setError, setShowNotification, setFormData, handleSubmissionError }) {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ __html: "" });
    setSubmitting(true);

    const emailRegex =
      role === "student"
        ? /^[a-zA-Z0-9._%+-]+@student\.apc\.edu\.ph$/
        : /^[a-zA-Z0-9._%+-]+@faculty\.apc\.edu\.ph$/;
    if (!emailRegex.test(formData.email)) {
      setError({
        __html: "Email format is invalid. Please use APC Domain",
      });
      setSubmitting(false);
      return;
    }

    try {
      const userData = { ...formData, role };
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

      // Redirect to /account after successful registration
      navigate("/account");

      setTimeout(() => {
        setShowNotification(false); // Hide notification after 5 seconds
        setSubmitting(false); // Reset submitting flag
      }, 5000); // Hide notification after 5 seconds
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle submission error using the provided handleSubmissionError function
      handleSubmissionError(error);
      setSubmitting(false); // Reset submitting flag
    }
  };

  return (
    <button
      type="submit"
      className="items-center px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none"
      disabled={submitting}
      onClick={handleSubmit}
    >
      {submitting ? "Signing Up..." : "Sign Up"}
    </button>
  );
}
