import { useEffect } from "react";
import { Box, Skeleton, Typography, Grid, useMediaQuery } from "@mui/material";
import Post from "./Post";
import useInfiniteScroll from "@utils/useInfiniteScroll";
import { useDispatch, useSelector } from "react-redux";
import { setPostLists, setSearchTextLoading } from "../api/post/postSlice";
import { useGetPostQuery, useGetSearchPostQuery } from "../api/post/postApi";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router";


export default function PostList() {
  const searchText = useSelector((state) => state.post.searchText);
  const searchPostsLoading = useSelector(
    (state) => state.post.searchPostsLoading,
  );
  const prevPostList = useSelector((state) => state.post.postLists);
  const dispatch = useDispatch();
  const location = useLocation();
  const isNavbar = location.pathname === "/";

  const { data: searchPosts, isLoading: searchLoading } = useGetSearchPostQuery(
    isNavbar ? searchText : "",
    { skip: !searchText, refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    dispatch(setSearchTextLoading(searchLoading));
  }, [dispatch, searchLoading]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isBiggerScreen= useMediaQuery(theme.breakpoints.down("xl"));

  const pageSize = isBiggerScreen ? 2 : 4;

  const { list: dataList, isLoading: infiniteLoading } = useInfiniteScroll(
    useGetPostQuery,
    pageSize,
    prevPostList,
    setPostLists,
  );

  const posts = searchText ? searchPosts && searchPosts.data : dataList;
  const loading = searchPostsLoading || searchLoading || infiniteLoading;

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 2, ml: isSmallScreen ? "0px" : "400px" }}>
        <Grid container spacing={2}>
          {loading ? (
            <>
              {Array.from({ length: 4 }).map((_, index) => (
                <Grid item xs={12} sm={11} key={index} mt={5}>
                  <Skeleton
                    variant="rectangular"
                    height={500}
                    sx={{ borderRadius: "12px", mb: "20px" }}
                  />
                </Grid>
              ))}
            </>
          ) : (
            <>
              {posts && posts.length > 0 ? (
                <>
                  {posts.map((item) => (
                    <Grid
                      item
                      xs={12}
                      sm={10}
                      key={item._id}
                      mt={isSmallScreen ? 1 : 4}
                    >
                      <Post item={item} />
                    </Grid>
                  ))}
                </>
              ) : (
                <Typography
                  gutterBottom
                  sx={{
                    color: "text.secondary",
                    margin: "100px auto",
                    textAlign: "center",
                    fontSize: { xs: "24px", md: "38px" },
                    ml: isSmallScreen ? "" : "400px",
                  }}
                >
                  No post available
                </Typography>
              )}
            </>
          )}
        </Grid>
      </Box>
    </>
  );
}
