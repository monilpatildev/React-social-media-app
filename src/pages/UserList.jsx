import Box from "@mui/material/Box";
import { useGetAllUsersQuery } from "../api/api";
import { Skeleton, Typography } from "@mui/material";
import UserCard from "@components/UserCard";
import Navbar from "@components/Navbar";
import { useEffect, useState } from "react";

export default function UserList() {
  const pageSize = 6;
  const [pageNumber, setPageNumber] = useState(1);
  const [posts, setPosts] = useState([]);

  const { data, isFetching } = useGetAllUsersQuery({
    pageSize,
    pageNumber,
  });

  useEffect(() => {
    if (data?.data?.length) {
      setPosts((prevPosts) => {
        const newPosts = data.data.filter(
          (post) => !prevPosts.some((prevPost) => prevPost._id === post._id),
        );
        return [...prevPosts, ...newPosts];
      });
    }
  }, [data]);

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        console.log("Fetching more data...");
        setPageNumber(pageNumber + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [isFetching, pageNumber]);
  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          paddingTop: "30px",
          minHeight: "825px",
        }}
      >
        {posts?.length ? (
          posts.map((item, index) => (
            <Box
              key={index}
              sx={{
                marginTop: "30px",
                mx: 50,
                backgroundColor: "#f0f0f0",
              }}
            >
              {item ? (
                <UserCard item={item} data={data} />
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
              margin: "100px",
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
