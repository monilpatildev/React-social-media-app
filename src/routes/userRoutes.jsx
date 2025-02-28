import UserProfile from "@pages/UserProfile";
import FollowPage from "@pages/FollowPage";

const userRoutes = [
  {
    path: "user",
    children: [
      { path: "followers", element: <FollowPage /> },
      { path: "following", element: <FollowPage /> },
      {
        path: ":id",
        children: [
          { index: true, element: <UserProfile /> },
          { path: "followers", element: <FollowPage /> },
          { path: "following", element: <FollowPage /> },
        ],
      },
    ],
  },
];

export default userRoutes;
