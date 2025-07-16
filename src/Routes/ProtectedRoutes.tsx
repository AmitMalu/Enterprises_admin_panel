import { Navigate, Outlet } from "react-router-dom";
import { checkTokenValidity, clearStorage } from "../Utils/utils";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  const isValid = checkTokenValidity(token);

  if (!isValid) {
    clearStorage();
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
