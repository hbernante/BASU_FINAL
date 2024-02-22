import { Navigate, createBrowserRouter } from "react-router-dom";

import Dashboard from "./views/Dashboard";
import Reservation from "./views/Reservation";
import Login from "./views/Login";
import Signup from "./views/Signup";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import LocationTrack from "./views/LocationTrack";
import ReservationView from "./views/ReservationView";
import ReservationPublicView from "./views/ReservationPublicView";
import Account from "./views/AccountRegister";
import Role from "./views/Role";
import AccountRegister from "./views/AccountRegister";
import AccountList from "./views/AccountList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Navigate to="/" />,
      },
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/reservation",
        element: <Reservation />,
      },
      {
        path: "/reservation/create",
        element: <ReservationView />,
      },
      {
        path: "/reservation/:id",
        element: <ReservationView />,
      },
      {
        path: "/locationtrack",
        element: <LocationTrack />,
      },
      {
        path: "/account/register",
        element: <AccountRegister />,
      },
      {
        path: "/account/role",
        element: <Role />,
      },
      {
        path: "/account/",
        element: <AccountList />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/reservation/public/:slug",
    element: <ReservationPublicView />,
  },
]);

export default router;
