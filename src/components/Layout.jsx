import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useContext, useLayoutEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { setUserLoggedIn } from "../api/auth/authSlice";


const Layout = () => {
  const dispatch = useDispatch();
  const { cookie } = useContext(AuthContext);
  useLayoutEffect(() => {
    dispatch(setUserLoggedIn(!!cookie));
  }, [cookie, dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
