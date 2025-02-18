import Box from "@mui/material/Box";
import { Skeleton, Typography } from "@mui/material";
import Post from "./Post";
import useInfiniteScroll from "@utils/useInfiniteScroll";

import { useDispatch, useSelector } from "react-redux";
import { setPostLists, setSearchTextLoading } from "../api/post/postSlice";
import { useGetPostQuery, useGetSearchPostQuery } from "../api/post/postApi";

export default function PostList() {
  const searchText = useSelector((state) => state.post.searchText);
  const searchPostsLoading = useSelector(
    (state) => state.post.searchPostsLoading,
  );
  const prevPostList = useSelector((state) => state.post.postLists);
  const { data: searchPosts, isLoading: searchLoading } = useGetSearchPostQuery(
    searchText,
    { skip: !searchText },
  );
  const dispatch = useDispatch();
  dispatch(setSearchTextLoading(!!searchLoading));
  const pageSize = 4;
  const { postLists: dataList, isLoading: infiniteLoading } = useInfiniteScroll(
    useGetPostQuery,
    pageSize,
    prevPostList,
    setPostLists,
  );
  const posts = searchText ? searchPosts && searchPosts.data : dataList;
  const loading =
    searchPostsLoading || searchLoading || infiniteLoading ? true : false;

  return (
    <>
      {loading ? (
        <Box sx={{ textAlign: "center", my: 5 }}>
          {Array.from("1234").map((item, index) => (
            <Box key={index}>
              <Skeleton
                variant="rectangular"
                height={400}
                sx={{ margin: "100px 400px", borderRadius: "12px" }}
              />
            </Box>
          ))}
        </Box>
      ) : posts && posts.length > 0 ? (
        posts.map((item) => (
          <Box
            key={item._id}
            sx={{
              margin: "0px 300px",
              my: 5,
              zIndex: "10",
              ml: "350px",
            }}
          >
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
