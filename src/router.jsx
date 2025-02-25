import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import RedirectRoute from "./components/RedirectRoute";

import Home from "@pages/Home";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import UserProfile from "@pages/UserProfile";
import UserList from "@pages/UserList";
import FollowRequests from "@pages/FollowRequests";
import FollowPage from "@pages/FollowPage";

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
          { path: "/user/:id", element: <UserProfile /> },
          { path: "/users", element: <UserList /> },
          { path: "/follow-request", element: <FollowRequests /> },
          { path: "/user/followers", element: <FollowPage /> },
          { path: "/user/following", element: <FollowPage /> },
          { path: "/user/:id/followers", element: <FollowPage /> },
          { path: "/user/:id/following", element: <FollowPage /> },
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
