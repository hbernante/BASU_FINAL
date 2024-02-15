import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
  const { userToken } = useStateContext();

  if (userToken) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gray-200 flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-50 w-auto"
            src="./images/basu_logo.png"
            alt="BASU Logo"
          />
          <Outlet />
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm lg:text-base">
          &copy; APPTECH BASU | Bernante | Lim | San Jose.
        </p>
      </footer>
    </div>
  );
}
