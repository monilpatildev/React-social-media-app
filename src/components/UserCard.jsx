/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import UserProfileLogo from "./UserProfileLogo";
import { useSelector } from "react-redux";
import {
  useAcceptFollowRequestMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../api/follow/followApi";
import { useGetUserQuery } from "../api/user/userApi";
import { useNavigate } from "react-router";

const UserCard = ({ item, pageType }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const loggedUserData = useSelector((state) => state.user.loggedUserData);
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const [acceptFollowRequest] = useAcceptFollowRequestMutation();

  const isAllUsersPage = location.pathname === "/users";
  const isFollowRequestPage = location.pathname === "/follow-request";

  
  const extractedUser = useMemo(() => {
    if (item?.firstname) return item;
    if (pageType === "followers" || pageType === "followRequest") {
      return typeof item.followerId === "object" ? item.followerId : null;
    }
    if (pageType === "following") {
      return typeof item.followingId === "object" ? item.followingId : null;
    }
    return null;
  }, [item, pageType]);


  const userId = useMemo(() => {
    if (extractedUser) return extractedUser._id;
    if (pageType === "followers" || pageType === "followRequest") {
      return typeof item.followerId === "string"
        ? item.followerId
        : item.followerId?._id;
    }
    if (pageType === "following") {
      return typeof item.followingId === "string"
        ? item.followingId
        : item.followingId?._id;
    }
    return item._id;
  }, [extractedUser, item, pageType]);


  const { data: fetchedUser } = useGetUserQuery(userId, { skip: !userId });
  const user = extractedUser || fetchedUser;


  const followEntry = useMemo(() => {
    return loggedUserData?.following?.find(
      (f) => f.followingId?._id === user?._id,
    );
  }, [loggedUserData, user]);


  const handleFollowUser = async () => {
    if (pageType === "followRequest") {
      console.log(item);

      acceptFollowRequest({ id: item?.followerId });
    } else {
      if (followEntry) {
        await unfollowUser({ id: user?._id });
      } else {
        await followUser({ id: user?._id });
      }
    }
  };


  const handleUserProfile = () => {
    if (user?._id) {
      navigate(`/user/${user._id}`);
    }
  };

  console.log(item);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={1.25}
      sx={{
        p: isSmallScreen ? "20px" : "20px 50px",
        m: "0px auto",
        borderRadius: "12px",
        backgroundColor: "#fff",
        width: "100%",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ cursor: "pointer" }}
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
      {user?.username !== loggedUserData?.username && (
        <Stack
          alignItems="center"
          justifyContent="center"
          width={isSmallScreen ? 100 : 200}
        >
          {isAllUsersPage || isFollowRequestPage ? (
            <Button
              variant="contained"
              color={
                pageType === "followRequest"
                  ? "primary"
                  : followEntry
                    ? "default"
                    : "primary"
              }
              disabled={
                isAllUsersPage &&
                user?.isPrivate &&
                user?.isFollowing &&
                !user?.isAccepted
                  ? true
                  : false
              }
              onClick={handleFollowUser}
              sx={{
                width: isSmallScreen ? "auto" : "130px",
                fontSize: isSmallScreen ? 14 : undefined,
                p: isSmallScreen ? 0.3 : undefined,
                px: isSmallScreen ? 0.9 : undefined,
              }}
            >
              {isFollowRequestPage
                ? "Accept"
                : item?.isPrivate
                  ? !item?.isFollowing && !item?.isAccepted
                    ? "Follow"
                    : item?.isFollowing && !item?.isAccepted
                      ? "Requested"
                      : followEntry
                        ? "Unfollow"
                        : "Follow"
                  : followEntry
                    ? "Unfollow"
                    : "Follow"}
            </Button>
          ) : (
            ""
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default UserCard;
