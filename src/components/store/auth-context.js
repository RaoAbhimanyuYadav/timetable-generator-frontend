import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Axios from "../Api";

const AuthContext = createContext({
  isLoggedIn: false,
  login: function (body) {},
  logout: function () {},
  register: function (body) {},
});

export function AuthContextProvider(props) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const tokens = localStorage.getItem("accessToken");
    const accessToken = tokens ? `${JSON.parse(tokens)}` : "";
    if (tokens) {
      Axios.post("login/token/verify/", {
        token: accessToken,
      })
        .then((resp) => {
          if (resp.status === 200) {
            if (location.pathname === "/login") navigate("/");
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err.response.data.detail);
          setIsLoggedIn(false);
          navigate("/login");
        });
    } else {
      navigate("/login");
    } // eslint-disable-next-line
  }, [setIsLoggedIn]);

  function login(body) {
    Axios.post("login/token/", body)
      .then((response) => {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.access)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(response.data.refresh)
        );
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => console.log(err.response.data.detail));
  }

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    navigate("/login");
  }

  function register(body) {
    Axios.post("register/", body)
      .then((response) => {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.access)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(response.data.refresh)
        );
        setIsLoggedIn(true);
        return navigate("/");
      })
      .catch((err) => console.log(err.response.data.detail));
  }

  const context = {
    isLoggedIn,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
