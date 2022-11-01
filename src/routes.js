import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/HOC/Navbar";
import ErrorPage from "./components/common/ErrorPage";
import HomePage from "./components/pages/HomePage";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Year from "./components/pages/Year";
import Professor from "./components/pages/Professor";
import Subject from "./components/pages/Subject";
import Timing from "./components/pages/Timing";

const routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/year" element={<Year />} />
        <Route path="/professor" element={<Professor />} />
        <Route path="/subject" element={<Subject />} />
        <Route path="/timing" element={<Timing />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
