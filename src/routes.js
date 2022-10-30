import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RoomForm from "./components/pages/RoomForm";
import Navbar from "./components/HOC/Navbar";
import ErrorPage from "./components/common/ErrorPage";
import HomePage from "./components/pages/HomePage";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";

const router = createBrowserRouter([
  {
    path: "",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "room/",
    element: <RoomForm />,
  },
  {
    path: "login/",
    element: <Login />,
  },
  {
    path: "signup/",
    element: <SignUp />,
  },
]);

const routes = () => {
  return (
    <>
      <Navbar />

      <RouterProvider router={router} />
    </>
  );
};

export default routes;
