import UserCard from "@components/UserCard";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useParams, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetUserQuery } from "../api/user/userApi";
import Navbar from "@components/Navbar";
import { capitalize } from "@utils/string";

const FollowPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const loggedUserData = useSelector((state) => state.user.loggedUserData);
  const location = useLocation();
  const { id } = useParams();
  const { data: userData } = useGetUserQuery(id, { skip: !id });
  const searchText = useSelector((state) => state.post.searchText);

  const isLoggedUserFollowerPage = location.pathname === "/user/followers";
  const isLoggedUserFollowingPage = location.pathname === "/user/following";
  const isUsersFollowerPage =
    id && location.pathname === `/user/${id}/followers`;
  const isUsersFollowingPage =
    id && location.pathname === `/user/${id}/following`;

  const activeFollowing = isLoggedUserFollowingPage || isUsersFollowingPage;
  const activeFollowers = isLoggedUserFollowerPage || isUsersFollowerPage;

  const loggedUserFollowList = isLoggedUserFollowerPage
    ? loggedUserData?.follower
    : isLoggedUserFollowingPage && loggedUserData?.following;

  const userFollowList = isUsersFollowerPage
    ? userData?.follower
    : isUsersFollowingPage && userData?.following;

  const usersList =
    isLoggedUserFollowerPage || isLoggedUserFollowingPage
      ? loggedUserFollowList
      : (isUsersFollowerPage || isUsersFollowingPage) && userFollowList;

  const filteredList =
    usersList?.length && searchText
      ? usersList?.filter((user) =>
          activeFollowing
            ? user?.followingId?.firstname
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
              user?.followingId?.username
                .toLowerCase()
                .includes(searchText.toLowerCase())
            : user?.followerId?.firstname
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
              user?.followerId?.username
                .toLowerCase()
                .includes(searchText.toLowerCase()),
        )
      : usersList;

  const usersArray = filteredList ? filteredList : usersList;
  const followingLink = id ? `/user/${id}/following` : "/user/following";
  const followersLink = id ? `/user/${id}/followers` : "/user/followers";

  return (
    <>
      <Navbar />
      <Box
        sx={{
          position: "fixed",
          top: "64px",
          left: 0,
          right: 0,
          backgroundColor: "white",
          zIndex: 1100,
          borderBottom: "1px solid #ddd",
          mt: "8px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Button
            component={Link}
            to={followingLink}
            sx={{
              flex: 1,
              borderRadius: 0,
              borderBottom: activeFollowing ? "2px solid black" : "none",
              fontWeight: activeFollowing ? "bold" : "normal",
            }}
          >
            Following
          </Button>
          <Button
            component={Link}
            to={followersLink}
            sx={{
              flex: 1,
              borderRadius: 0,
              borderBottom: activeFollowers ? "2px solid black" : "none",
              fontWeight: activeFollowers ? "bold" : "normal",
            }}
          >
            Followers
          </Button>
        </Box>
      </Box>

      <Typography
        sx={{
          ml: { xs: isSmallScreen ? "0px" : "16px", sm: "24px" },
          mt: isSmallScreen ? "8px" : "auto",
          pt: isSmallScreen ? "8px" : "auto",
          fontSize: "24px",
          position: "fixed",
          top: theme.spacing(isSmallScreen ? 13 : 15),
          zIndex: 1100,
          color: "#2979ff",
          backgroundColor: isSmallScreen ? "#f0f0f0" : "transparent",
          width: isSmallScreen ? "100%" : "auto",
        }}
        variant="text"
      >
        <Link
          to={
            !isLoggedUserFollowingPage && !isLoggedUserFollowerPage
              ? `/user/${id}`
              : "/profile"
          }
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            color: "inherit",
            fontSize: isSmallScreen ? 16 : 28,
          }}
        >
          <ArrowBackIcon
            sx={{ mr: "5px", fontSize: isSmallScreen ? 16 : 18 }}
          />
          {userData
            ? `${capitalize(userData?.firstname)} ${capitalize(userData?.lastname)}`
            : "Back"}
        </Link>
      </Typography>

      <Box
        sx={{
          pt: "120px",
          p: { xs: "10px", sm: "20px" },
          mt: isSmallScreen ? "60px" : "25px",
        }}
      >
        <Box>
          {usersArray?.length ? (
            usersArray.map((item, index) => (
              <Box
                key={index}
                sx={{
                  m: { xs: "10px", sm: "30px" },
                  mx: { xs: "10px", sm: 50 },
                }}
              >
                <UserCard
                  item={item}
                  pageType={activeFollowers ? "followers" : "following"}
                />
              </Box>
            ))
          ) : (
            <Typography
              gutterBottom
              sx={{
                color: "text.secondary",
                mt: "100px",
                textAlign: "center",
                fontSize: { xs: 24, md: 38 },
                width: "100%",
              }}
            >
              {searchText
                ? "No user found"
                : activeFollowers
                  ? "0 follower"
                  : "0 following"}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default FollowPage;
