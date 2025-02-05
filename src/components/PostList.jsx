import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import PostItem from "./PostItem";

export default function PostList() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={10}
        minHeight={160}
        marginTop={"50px"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        size="grow"
      >
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
      </Grid>
    </Box>
  );
}
