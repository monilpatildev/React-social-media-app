import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import RedirectRoute from "../components/RedirectRoute";

import Home from "@pages/Home";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import UserList from "@pages/UserList";
import FollowRequests from "@pages/FollowRequests";

import userRoutes from "./userRoutes";
import UserProfile from "@pages/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/profile", element: <UserProfile /> },
          { path: "/users", element: <UserList /> },
          { path: "/follow-request", element: <FollowRequests /> },
          ...userRoutes,
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          { path: "/signup", element: <SignUp /> },
          { path: "/signin", element: <SignIn /> },
        ],
      },
      {
        path: "*",
        element: <RedirectRoute />,
      },
    ],
  },
]);

export default router;
