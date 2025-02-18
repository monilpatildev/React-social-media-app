import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

function App() {
  const dispatch = useDispatch();
  const { cookie } = useContext(AuthContext);
  const userLoggedIn = useSelector((state) => state.auth.userLoggedIn);

  useLayoutEffect(() => {
    if (cookie) {
      dispatch(setUserLoggedIn(true));
    } else {
      dispatch(setUserLoggedIn(false)); 
    }
  }, [cookie, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {userLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/follow-request" element={<FollowRequests />} />
            <Route path="/user/followers" element={<FollowPage />} />
            <Route path="/user/following" element={<FollowPage />} />
            <Route path="/user/:id/followers" element={<FollowPage />} />
            <Route path="/user/:id/following" element={<FollowPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/signin" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
