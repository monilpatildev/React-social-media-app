import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RedirectRoute = () => {
  const userLoggedIn = useSelector((state) => state.auth.userLoggedIn);
  return <Navigate to={userLoggedIn ? "/" : "/signin"} replace />;
};

export default RedirectRoute;
