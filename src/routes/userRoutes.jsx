import UserProfile from "@pages/UserProfile";
import FollowPage from "@pages/FollowPage";

const userRoutes = [
  {
    path: "user",
    children: [
      { path: "followers", element: <FollowPage /> },
      { path: "following", element: <FollowPage /> },
      { path: ":id", element: <UserProfile /> },
      { path: ":id/followers", element: <FollowPage /> },
      { path: ":id/following", element: <FollowPage /> },
    ],
  },
];

export default userRoutes;
