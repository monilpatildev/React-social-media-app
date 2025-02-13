import Box from "@mui/material/Box";
import { useGetAllUsersQuery } from "../api/api";
import { Skeleton, Typography } from "@mui/material";
import UserCard from "@components/UserCard";
import Navbar from "@components/Navbar";
import useInfiniteScroll from "@utils/useInfiniteScroll";
import { useSelector } from "react-redux";

export default function UserList() {
  const pageSize = 8;
  const { dataList } = useInfiniteScroll(useGetAllUsersQuery, pageSize);
  const userData = useSelector((state) => state.user.loggedUserData);

  const usersArray = dataList.filter(
    (item) =>
      item.email !== userData.email && item.username !== userData.username,
  );
  

  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          paddingTop: "30px",
          minHeight: "825px",
          p: "20px",
        }}
      >
        {usersArray?.length ? (
          usersArray.map((item, index) => (
            <Box
              key={index}
              sx={{
                m: "30px",
                mx: 50,
                backgroundColor: "#f0f0f0",
              }}
            >
              {item ? (
                <UserCard item={item}  />
              ) : (
                <>
                  <Skeleton
                    variant="rectangular"
                    height={130}
                    sx={{
                      pr: 2,
                      margin: "5px 10px",
                      display: "flex",
                      padding: "10px",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  />
                </>
              )}
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
      </Box>
    </>
  );
}
