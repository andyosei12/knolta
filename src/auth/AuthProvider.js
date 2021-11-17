import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const [authToken, setAuthToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (token) => {
    console.log("You are logged in");
    setAuthToken(token);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    console.log("logging out");
    setAuthToken("");
    setIsLoggedIn(false);
  };

  const initialValue = {
    authToken,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={initialValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
