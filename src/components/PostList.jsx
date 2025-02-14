import Box from "@mui/material/Box";
import { Skeleton, Typography } from "@mui/material";
import Post from "./Post";
import useInfiniteScroll from "@utils/useInfiniteScroll";
import { useGetPostQuery, useGetSearchPostQuery } from "../api/api";
import { useSelector } from "react-redux";

export default function PostList() {
  const searchText = useSelector((state) => state.post.searchText);
  const searchPostsLoading = useSelector(
    (state) => state.post.searchPostsLoading,
  )
  const { data: searchPosts, isLoading: searchLoading } = useGetSearchPostQuery(
    searchText,
    { skip: !searchText },
  );

  const pageSize = 2;
  const { dataList, isLoading: infiniteLoading } = useInfiniteScroll(
    useGetPostQuery,
    pageSize
  );
  const posts = searchText ? (searchPosts ? searchPosts.data : []) : dataList;
  const loading =
    searchPostsLoading || searchLoading || infiniteLoading ? true : false;

  return (
    <>
      {loading ? (
        <Box sx={{ textAlign: "center", my: 5 }}>
          <Skeleton
            variant="rectangular"
            height={400}
            sx={{ margin: "100px 200px", borderRadius: "12px" }}
          />
          <Skeleton
            variant="rectangular"
            height={400}
            sx={{ margin: "100px 200px", borderRadius: "12px" }}
          />
        </Box>
      ) : posts && posts.length > 0 ? (
        posts.map((item) => (
          <Box key={item._id} sx={{ margin: "200px", my: 5 }}>
            <Post item={item} />
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
          }}
        >
          No post available
        </Typography>
      )}
    </>
  );
}
