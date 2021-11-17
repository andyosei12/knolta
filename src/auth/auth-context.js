import { createContext } from "react";

const AuthContext = createContext({
  authToken: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export default AuthContext;
