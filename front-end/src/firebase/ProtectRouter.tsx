import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

const ProtectedRoute = () => {
  const { currentUser, } = useContext(AuthContext);

  // NOTE: console log for testing purposes

  // Check if the current user exists on the initial render.

  if (!currentUser) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
};

export { ProtectedRoute };
