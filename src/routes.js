import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import RoomForm from "./components/pages/RoomForm";
import Navbar from "./components/HOC/Navbar";
import ErrorPage from "./components/common/ErrorPage";
import HomePage from "./components/pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/room/",
    element: <RoomForm />,
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
