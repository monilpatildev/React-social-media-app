import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import PostItem from "./PostItem";
import { useGetPostQuery } from "../api/api";

export default function PostList() {
  const { data, isLoading, isFetching, isError } = useGetPostQuery({
    pageSize:5,
    pageNumber:1,
  });
  console.log("post",data);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={17}
        minHeight={160}
        marginTop={"50px"}
        display="flex"
        padding="50px"
        flexWrap="wrap"
        alignItems="center"
        
        size="grow"
      >
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
      </Grid>
    </Box>
  );
}
