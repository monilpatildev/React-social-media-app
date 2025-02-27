import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const ProtectedRoute = () => {
  const userLoggedIn = useSelector((state) => state.auth.userLoggedIn);
  return userLoggedIn ? <> <Navbar /><Outlet /></> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
