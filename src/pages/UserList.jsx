import Box from "@mui/material/Box";
import { Skeleton, Typography, Grid, useMediaQuery } from "@mui/material";
import UserCard from "@components/UserCard";
import Navbar from "@components/Navbar";
import useInfiniteScroll from "@utils/useInfiniteScroll";
import { useSelector } from "react-redux";
import { useGetAllUsersQuery } from "../api/user/userApi";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { setUsersList } from "../api/user/userSlice";
import { useTheme } from "@mui/material";

export default function UserList() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const searchText = useSelector((state) => state.post.searchText);

  const prevUserList = useSelector((state) => state.user.usersList);
  const pageSize = 8;
  const loggedUserData = useSelector((state) => state.user.loggedUserData);

  const { list, isLoading } = useInfiniteScroll(
    useGetAllUsersQuery,
    pageSize,
    prevUserList,
    setUsersList,
  );
  const usersArray = list?.filter(
    (item) =>
      item?.username !== loggedUserData?.username ||
      item?.email !== loggedUserData?.email,
  );

  console.log(usersArray);

  return (
    <>
      <Navbar />
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
            to={"/"}
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
          pt: "30px",
          p: isSmallScreen ? "10px" : "20px 400px",
          mt: isSmallScreen ? "10px" : "30px",
        }}
      >
        {!isLoading ? (
          <>
            {usersArray?.length ? (
              <Grid container spacing={2}>
                {usersArray.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <UserCard item={item} pageType="allUsers" />
                  </Grid>
                ))}
              </Grid>
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
                {!searchText ? "Search for user.." : "No user available"}
              </Typography>
            )}
          </>
        ) : (
          <Grid container spacing={2}>
            {Array.from("12345").map((_, index) => (
              <Grid item xs={12} key={index}>
                <Skeleton
                  variant="rectangular"
                  height={110}
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "14px",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}
