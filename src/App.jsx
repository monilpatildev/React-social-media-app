import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import Home from "@pages/Home";
import { AuthContext } from "./context/AuthContext.jsx";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoggedIn, setAuthToken } from "./api/auth/authSlice.js";
import UserProfile from "@pages/UserProfile.jsx";
import UserList from "@pages/UserList.jsx";

function App() {
  const dispatch = useDispatch();
  const { cookie } = useContext(AuthContext);
  const userLoggedIn = useSelector((state) => state.auth.userLoggedIn);

  useEffect(() => {
    if (cookie) {
      dispatch(setAuthToken(cookie));
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
            <Route path="/:id" element={<UserProfile />} />
            <Route path="/users" element={<UserList />} />
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
