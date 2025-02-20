import Navbar from "@components/Navbar";
import UserCard from "@components/UserCard";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useParams, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetUserQuery } from "../api/user/userApi";

const FollowPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const loggedUserData = useSelector((state) => state.user.loggedUserData);
  const location = useLocation();
  const { id } = useParams();

  const { data: user } = useGetUserQuery(id, { skip: !id });

  // Determine which follow list to display based on the URL
  const isLoggedUserFollowerPage = location.pathname === "/user/followers";
  const isLoggedUserFollowingPage = location.pathname === "/user/following";
  const isUsersFollowerPage =
    id && location.pathname === `/user/${id}/followers`;
  const isUsersFollowingPage =
    id && location.pathname === `/user/${id}/following`;

  // Determine active tab
  const activeFollowing = isLoggedUserFollowingPage || isUsersFollowingPage;
  const activeFollowers = isLoggedUserFollowerPage || isUsersFollowerPage;

  // Get follow list data
  const loggedUserFollowList = isLoggedUserFollowerPage
    ? loggedUserData?.follower
    : isLoggedUserFollowingPage && loggedUserData?.following;

  const userFollowList = isUsersFollowerPage
    ? user?.follower
    : isUsersFollowingPage && user?.following;

  const usersArray =
    isLoggedUserFollowerPage || isLoggedUserFollowingPage
      ? loggedUserFollowList
      : (isUsersFollowerPage || isUsersFollowingPage) && userFollowList;

  // Define routes for the buttons
  const followingLink = id ? `/user/${id}/following` : "/user/following";
  const followersLink = id ? `/user/${id}/followers` : "/user/followers";

  return (
    <>
      <Navbar />
      {/* Fixed Toggle Buttons Container */}
      <Box
        sx={{
          position: "fixed",
          top: "64px", // adjust this if your Navbar height differs
          left: 0,
          right: 0,
          backgroundColor: "white",
          zIndex: 1100,
          borderBottom: "1px solid #ddd",
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

      {!isSmallScreen && (
        <Typography
          sx={{
            ml: { xs: "16px", sm: "24px" },
            fontSize: "24px",
            position: "fixed",
            top: theme.spacing(12),
            zIndex: 1100,
            mt: "10px",
            color: "#2979ff",
          }}
          variant="text"
        >
          <Link
            to={"/profile"}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              color: "inherit",
            }}
          >
            <ArrowBackIcon sx={{ mr: "5px" }} /> Back
          </Link>
        </Typography>
      )}

      <Box
        sx={{
          pt: "120px",
          minHeight: "825px",
          p: { xs: "10px", sm: "20px" },
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
                  isLoggedUserFollowerPage={isLoggedUserFollowerPage}
                  isLoggedUserFollowingPage={isLoggedUserFollowingPage}
                  isUsersFollowerPage={isUsersFollowerPage}
                  isUsersFollowingPage={isUsersFollowingPage}
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
              {activeFollowers ? "0 follower" : "0 following"}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default FollowPage;
