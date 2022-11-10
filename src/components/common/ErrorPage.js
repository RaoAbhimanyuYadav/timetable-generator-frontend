import { useContext } from "react";
import AuthContext from "../store/auth-context";

export default function ErrorPage() {
  const authCntxt = useContext(AuthContext);
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>
        {authCntxt.isLoggedIn
          ? "Sorry, an unexpected error has occurred."
          : "Please Login First"}
      </p>
    </div>
  );
}
