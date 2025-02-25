import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const userLoggedIn = useSelector((state) => state.auth.userLoggedIn);
  return !userLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;
