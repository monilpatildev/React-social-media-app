import Navbar from "@components/Navbar";
import UserCard from "@components/UserCard";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router";
import { useGetUserQuery } from "../api/user/userApi";

const FollowPage = () => {
  const loggedUserData = useSelector((state) => state.user.loggedUserData);
  const location = useLocation();
  const { id } = useParams();

  const { data: user } = useGetUserQuery(id, {
    skip: !id,
  });
  const isLoggedUserFollowerPage = location.pathname === "/user/followers";
  const isLoggedUserFollowingPage = location.pathname === "/user/following";

  const isUsersFollowerPage = location.pathname === `/user/${id}/followers`;
  const isUsersFollowingPage = location.pathname === `/user/${id}/following`;

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

  return (
    <>
      <Navbar />
      <Button sx={{ ml: "24px", fontSize: "24px", position: "fixed" }}>
        <Link to={-1}>
          {" "}
          <ArrowBackIcon sx={{ mr: "5px" }} /> Back{" "}
        </Link>
      </Button>
      <Box
        sx={{
          paddingTop: "30px",
          minHeight: "825px",
          p: "20px",
        }}
      >
        <Box>
          {usersArray?.length ? (
            usersArray.map((item, index) => (
              <Box
                key={index}
                sx={{
                  m: "30px",
                  mx: 50,
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
                fontSize: 38,
                width: "100%",
              }}
            >
              {isLoggedUserFollowerPage ? "0 follower" : "0 following"}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default FollowPage;
