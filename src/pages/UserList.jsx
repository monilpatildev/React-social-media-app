import Box from "@mui/material/Box";

import { Button, Skeleton, Typography } from "@mui/material";
import UserCard from "@components/UserCard";
import Navbar from "@components/Navbar";
import useInfiniteScroll from "@utils/useInfiniteScroll";
import { useSelector } from "react-redux";
import { useGetAllUsersQuery } from "../api/user/userApi";
import { Link } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function UserList() {
  const pageSize = 8;
  const { dataList, isLoading } = useInfiniteScroll(
    useGetAllUsersQuery,
    pageSize,
  );
  const loggedUserData = useSelector((state) => state.user.loggedUserData);

  let usersArray = dataList.filter(
    (item) =>
      item?.email !== loggedUserData?.email &&
      item?.username !== loggedUserData?.username,
  );
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
        {!isLoading ? (
          <>
            {usersArray?.length ? (
              usersArray.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    m: "30px",
                    mx: 50,
                  }}
                >
                  <UserCard item={item} />
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
                No user available
              </Typography>
            )}
          </>
        ) : (
          <Skeleton
            variant="rectangular"
            height={130}
            sx={{
              pr: 2,
              margin: "20px 10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              mx: "400px",
              borderRadius: "24px",
            }}
          />
        )}
      </Box>
    </>
  );
}
