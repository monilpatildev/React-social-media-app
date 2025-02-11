import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useGetPostQuery } from "../api/api";
import { Skeleton, Typography } from "@mui/material";
import Post from "./Post";

export default function PostList() {
  const pageSize = 3;
  const [pageNumber, setPageNumber] = useState(1);
  const [posts, setPosts] = useState([]);

  const { data, isLoading, isFetching } = useGetPostQuery({
    pageSize,
    pageNumber,
  });

  useEffect(() => {
    if (data?.data?.length) {
      setPosts((prevPosts) => {
        const newPosts = data.data.filter(
          (post) => !prevPosts.some((prevPost) => prevPost._id === post._id),
        );

        if (pageNumber === 1) {
          return [...newPosts, ...prevPosts];
        } else {
          return [...prevPosts, ...newPosts];
        }
      });
    }
  }, [data, pageNumber]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !isFetching
      ) {
        setPageNumber((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isFetching]);

  return (
    <>
      {posts.length > 0
        ? posts.map((item) => (
            <Box key={item._id} sx={{ margin: "200px", my: 5 }}>
              <Post item={item} />
            </Box>
          ))
        : !isLoading && (
            <Typography
              gutterBottom
              sx={{
                color: "text.secondary",
                margin: "100px",
                textAlign: "center",
                fontSize: 38,
              }}
            >
              No post available
            </Typography>
          )}

      {isLoading && (
        <Box sx={{ textAlign: "center", my: 5 }}>
          <Skeleton
            variant="rectangular"
            height={400}
            sx={{ margin: "100px 200px", borderRadius: "12px" }}
          />{" "}
          <Skeleton
            variant="rectangular"
            height={400}
            sx={{ margin: "100px 200px", borderRadius: "12px" }}
          />
        </Box>
      )}
    </>
  );
}
