/* eslint-disable react/prop-types */
import { Button, Stack, Typography } from "@mui/material";
import UserProfileLogo from "./UserProfileLogo";
import { useSelector } from "react-redux";
import {
  useAcceptFollowRequestMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../api/follow/followApi";
import { useGetUserQuery } from "../api/user/userApi";
import { useLocation } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const UserCard = ({
  item,
  isLoggedUserFollowerPage,
  isLoggedUserFollowingPage,
  isUsersFollowerPage,
  isUsersFollowingPage,
}) => {
  const loggedUserData = useSelector((state) => state.user.loggedUserData);
  const location = useLocation();
  
  const isFollowRequestPage = location.pathname === "/follow-request";
  const isAllUsersPage = location.pathname === "/users";

  const isFollowing =
    !isFollowRequestPage &&
    loggedUserData.following.find(
      (following) => following.followingId === item._id,
    )
      ? true
      : false;

  const { data: requestedUser } = useGetUserQuery(
    isLoggedUserFollowerPage || isUsersFollowerPage || isFollowRequestPage
      ? item?.followerId
      : item?.followingId,
    {
      skip: !item.followerId || !item?.followingId,
    },
  );

  const followRequestPageUsers = isFollowRequestPage && requestedUser;
  const allUsersPageUsers = isAllUsersPage && item;

  const user =
    isLoggedUserFollowerPage ||
    isLoggedUserFollowingPage ||
    isUsersFollowerPage ||
    isUsersFollowingPage
      ? requestedUser
      : followRequestPageUsers || allUsersPageUsers;

  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const [acceptFollowRequest] = useAcceptFollowRequestMutation();
// console.log(isFollowing);

  const handleFollowUser = () => {
    if (isFollowRequestPage) {
      toast.success("You accept request!", {
        autoClose: 300,
        onClose: () => {
          acceptFollowRequest({ id: item.followerId });
        },
      });
    } else {
      if (!isFollowing) {
        followUser({ id: item._id });
      } else {
        unfollowUser({ id: item._id });
      }
    }
  };
console.log(loggedUserData);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1.25}
        sx={{
          pr: 2,
          m: "5px 10px",
          p: "10px",
          borderRadius: "12px",
          backgroundColor: "#fff",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} pl={5}>
          <UserProfileLogo user={user} />

          <Stack
            direction="column"
            spacing={0.5}
            sx={{ pl: 5, m: "10px 55px" }}
          >
            <Typography
              variant="body2"
              fontSize={34}
              sx={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                maxWidth: "700px",
              }}
            >
              {user?.firstname} {user?.lastname}
            </Typography>
            {!isFollowRequestPage && (
              <Typography
                variant="caption"
                fontSize={18}
                sx={{
                  display: "block",
                  color: "text.secondary",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  maxWidth: "1000px",
                  fontStyle: "italic",
                }}
              >
                {user?.email}
              </Typography>
            )}
          </Stack>
        </Stack>

        <Stack
          sx={{ width: "200px" }}
          justifyContent="center"
          alignItems="center"
        >
          {user?.username !== loggedUserData?.username ? (
            <Button
              variant="contained"
              color={
                isFollowRequestPage
                  ? "primary"
                  : user?.isPrivate
                    ? isFollowing
                      ? "default"
                      : "secondary"
                    : isFollowing
                      ? "default"
                      : "primary"
              }
              onClick={handleFollowUser}
              sx={{ width: "100px" }}
            >
              {isFollowRequestPage
                ? "Accept"
                : user?.isPrivate
                  ? isFollowing
                    ? "Unfollow"
                    : "Request"
                  : isFollowing
                    ? "Unfollow"
                    : "Follow"}
            </Button>
          ) : (
            ""
          )}
        </Stack>
      </Stack>
      <ToastContainer />
    </>
  );
};

export default UserCard;
