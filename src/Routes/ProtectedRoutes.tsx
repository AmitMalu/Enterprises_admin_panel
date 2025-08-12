import { Navigate, Outlet, useLocation } from "react-router-dom";
import { checkTokenValidity, clearStorage } from "../Utils/utils";
import { getAllowedBaseLinks } from "../Utils/getAllowedBaseLinks";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  const isValid = checkTokenValidity(token);
  const location = useLocation();

  if (!isValid) {
    clearStorage();
    return <Navigate to="/login" />;
  }

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const role = userInfo?.role || "";
  const permissions = (userInfo?.permissions || "")
    .split(",")
    .map((p: string) => p.trim()) // ["0101", "0203", "0103"]
    .filter(Boolean);

  if (role === "AU") {
    const allowedBaseLinks = getAllowedBaseLinks(role, permissions);
    const alwaysAllowedPaths = ["/", "/profile", "/change-password"];
    const isAllowed =
      alwaysAllowedPaths.includes(location.pathname) || // Dashboard always allowed
      allowedBaseLinks.some((base) => location.pathname.startsWith(base));

    if (!isAllowed) {
      return <Navigate to="/" replace />;
    }
  }
  
  return <Outlet />;
};

export default ProtectedRoutes;
