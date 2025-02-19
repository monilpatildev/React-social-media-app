import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useContext, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "./context/AuthContext.jsx";
import { setUserLoggedIn } from "./api/auth/authSlice.js";
import Home from "@pages/Home";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import UserProfile from "@pages/UserProfile.jsx";
import UserList from "@pages/UserList.jsx";
import FollowRequests from "@pages/FollowRequests.jsx";
import FollowPage from "@pages/FollowPage.jsx";

const ProtectedRoute = () => {
  const userLoggedIn = useSelector((state) => state.auth.userLoggedIn);
  return userLoggedIn ? <Outlet /> : <Navigate to="/signin" replace />;
};

const PublicRoute = () => {
  const userLoggedIn = useSelector((state) => state.auth.userLoggedIn);
  return !userLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {``
  const dispatch = useDispatch();
  const { cookie } = useContext(AuthContext);
  const userLoggedIn = useSelector((state) => state.auth.userLoggedIn);

  useLayoutEffect(() => {
    dispatch(setUserLoggedIn(cookie ? true : false));
  }, [cookie, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/follow-request" element={<FollowRequests />} />
          <Route path="/user/followers" element={<FollowPage />} />
          <Route path="/user/following" element={<FollowPage />} />
          <Route path="/user/:id/followers" element={<FollowPage />} />
          <Route path="/user/:id/following" element={<FollowPage />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={userLoggedIn ? "/" : "/signin"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
