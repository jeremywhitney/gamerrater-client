import { Navigate } from "react-router-dom";

export const Authorized = ({ children }) => {
  if (localStorage.getItem("gamer_token")) {
    return children;
  }
  return <Navigate to="/login" replace />;
};
