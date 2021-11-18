import { useState, useEffect, useCallback } from "react";
import AuthContext from "./auth-context";

const calculateExpirationTime = (time) => {
  const currentTime = new Date().getTime();
  const remainingTime = new Date(time).getTime();

  const remainingDuration = remainingTime - currentTime;
  return remainingDuration;
};

const retrieveInitialToken = () => {
  const storedToken = localStorage.getItem("authToken");
  const storedExpirationTime = localStorage.getItem("remainingTime");

  const remainingDuration = calculateExpirationTime(storedExpirationTime);
  if (remainingDuration <= 60000) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("remainingTime");
    return null;
  }
  return {
    authToken: storedToken,
    duration: remainingDuration,
  };
};

let logoutTimer;

const AuthProvider = (props) => {
  const tokenData = retrieveInitialToken();
  let token;
  if (tokenData) {
    token = tokenData.authToken;
  }

  const [authToken, setAuthToken] = useState(token);

  const isLoggedIn = !!authToken;

  const logoutHandler = useCallback(() => {
    setAuthToken("");
    localStorage.removeItem("authToken");
    localStorage.removeItem("remainingTime");

    if (logoutTimer) clearTimeout(logoutTimer);
  }, []);

  const loginHandler = (token, remainingTime) => {
    setAuthToken(token);
    localStorage.setItem("authToken", token);
    localStorage.setItem("remainingTime", remainingTime);

    const remainingDuration = calculateExpirationTime(remainingTime);
    logoutTimer = setTimeout(logoutHandler, remainingDuration);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

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
