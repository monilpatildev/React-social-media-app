import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import Home from "@pages/Home";
import { AuthContext } from "./context/AuthContext.jsx";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "./api/auth/authSlice.js";
import UserProfile from "@pages/UserProfile.jsx";

function App() {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const accessToken = useSelector((state) => state.auth.accessToken);
  const userLoggedIn = !!(accessToken) && accessToken !== null;

  useEffect(() => {
    if (token) {
      dispatch(setAccessToken(token));
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Routes>
        {userLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />
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
