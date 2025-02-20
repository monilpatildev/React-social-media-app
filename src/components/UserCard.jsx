/* eslint-disable react/prop-types */
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import UserProfileLogo from "./UserProfileLogo";
import { useSelector } from "react-redux";
import {
  useAcceptFollowRequestMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../api/follow/followApi";
import { useGetUserQuery } from "../api/user/userApi";
import { useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "@mui/material/styles";

const UserCard = ({
  item,
  isLoggedUserFollowerPage,
  isLoggedUserFollowingPage,
  isUsersFollowerPage,
  isUsersFollowingPage,


}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const loggedUserData = useSelector((state) => state.user.loggedUserData);
  const location = useLocation();
  const navigate = useNavigate();

  const isFollowRequestPage = location.pathname === "/follow-request";
  const isAllUsersPage = location.pathname === "/users";

  const isFollowing =
    !isFollowRequestPage &&
    loggedUserData.following?.find(
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
  // console.log(data.data.map((dataUser) => dataUser.isFollowing === item.isFollowing));

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

  const handleFollowUser = async () => {
    if (isFollowRequestPage) {
      toast.success("You accepted request!", {
        autoClose: 300,
        onClose: () => {
          acceptFollowRequest({ id: item.followerId });
        },
      });
    } else {
      if (!isFollowing) {
        await followUser({ id: item._id });
      } else {
        await unfollowUser({ id: item._id });
      }
    }
  };
  console.log(item);
  const handleUserProfile = () => {
    {
      isLoggedUserFollowerPage || isUsersFollowerPage
        ? navigate(user && `/user/${item?.followerId}`)
        : isLoggedUserFollowingPage || isUsersFollowingPage
          ? navigate(user && `/user/${item?.followingId}`)
          : navigate(user && `/user/${user?._id}`);
    }
  };
  return (
    <>
      <Stack
        direction={isSmallScreen ? "column" : "row"}
        justifyContent="space-between"
        alignItems="center"
        spacing={1.25}
        sx={{
          p: 2,
          m: "0px auto",
          borderRadius: "12px",
          backgroundColor: "#fff",
          width: isSmallScreen ? "80%" : "100%",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ pl: isSmallScreen ? 0 : 5, cursor: "pointer" }}
          onClick={handleUserProfile}
        >
          <UserProfileLogo user={user} />
          <Stack
            direction="column"
            spacing={0.5}
            sx={{ pl: isSmallScreen ? 1 : 5, mx: isSmallScreen ? 1 : 5 }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: isSmallScreen ? 20 : 34,
                fontWeight: "bold",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                maxWidth: { xs: "200px", sm: "700px" },
              }}
            >
              {user?.firstname} {user?.lastname}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                fontSize: isSmallScreen ? 14 : 18,
                display: "block",
                color: "text.secondary",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                maxWidth: { xs: "200px", sm: "1000px" },
                fontStyle: "italic",
              }}
            >
              @{user?.username}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: isSmallScreen ? 14 : 18,
                display: "block",
                color: "text.secondary",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                maxWidth: { xs: "200px", sm: "1000px" },
                fontStyle: "italic",
              }}
            >
              {user?.email}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          sx={{ width: isSmallScreen ? "auto" : "200px" }}
          justifyContent={"center"}
          alignItems="center"
        >
          {user?.username !== loggedUserData?.username &&
          !isLoggedUserFollowerPage &&
          !isLoggedUserFollowingPage &&
          !isUsersFollowerPage &&
          !isUsersFollowingPage ? (
            <Button
              variant="contained"
              color={
                isFollowRequestPage
                  ? "primary"
                  : user?.isPrivate
                    ? !user?.isFollowing && !user?.isAccepted
                      ? "primary"
                      : ""
                    : isFollowing
                      ? "default"
                      : "primary"
              }
              disabled={
                user?.isPrivate && user?.isFollowing && !user?.isAccepted
                  ? true
                  : false
              }
              onClick={handleFollowUser}
              sx={{ width: isSmallScreen ? "auto" : "100px" }}
            >
              {isFollowRequestPage
                ? "Accept"
                : item?.isPrivate
                  ? !item?.isFollowing && !item?.isAccepted
                    ? "Follow"
                    : item?.isFollowing && !item?.isAccepted
                      ? "Requested"
                      : isFollowing
                        ? "Unfollow"
                        : "Follow"
                  : isFollowing
                    ? "Unfollow"
                    : "Follow"}
            </Button>
          ) : null}
        </Stack>
      </Stack>
      <ToastContainer />
    </>
  );
};

export default UserCard;
