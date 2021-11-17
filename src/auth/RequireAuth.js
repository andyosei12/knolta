import { useContext } from "react";
import { Navigate } from "react-router";
import AuthContext from "./auth-context";

const RequireAuth = (props) => {
  const authCtx = useContext(AuthContext);
  return authCtx.isLoggedIn ? props.children : <Navigate to="/login" replace />;
};

export default RequireAuth;
