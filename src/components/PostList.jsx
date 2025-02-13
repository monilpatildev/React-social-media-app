import Box from "@mui/material/Box";
import {  Skeleton, Typography } from "@mui/material";
import Post from "./Post";
import useInfiniteScroll from "@utils/useInfiniteScroll";
import { useGetPostQuery } from "../api/api";

export default function PostList() {
  const pageSize = 2;
  const {
    dataList: posts,
    isLoading,

  } = useInfiniteScroll(useGetPostQuery, pageSize);

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
