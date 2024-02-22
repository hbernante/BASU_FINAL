import React, { useState } from "react";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/TButton";
import { Link } from "react-router-dom";

export default function AccountRegister() {
  const [role, setRole] = useState("");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <PageComponent title="Account Registration" className="">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-medium underline mb-2">CREATE USER ACCOUNT</h1>
        <TButton>
          <Link to="/account" className="">
            Back to Account List
          </Link>
        </TButton>
      </div>

      <div className="pt-3 pb-3">
        <label
          htmlFor="roles"
          className="text-sm font-medium mb-2 flex justify-center"
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
          <form className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
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
                  className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            <div className="flex flex-col space-y-1">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
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
    </PageComponent>
  );
}
