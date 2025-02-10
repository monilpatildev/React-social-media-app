import Box from "@mui/material/Box";
import { useGetPostQuery } from "../api/api";
import { useSearchParams } from "react-router-dom";
import { Skeleton, Typography } from "@mui/material";
import Post from "./Post";
import { useEffect } from "react";

export default function PostList() {
  const [searchParams] = useSearchParams();
  const pageSize = Number(searchParams.get("pageSize")) || 5;
  const pageNumber = Number(searchParams.get("pageNumber")) || 1;
  const { data, isLoading, isError } = useGetPostQuery({
    pageSize,
    pageNumber,
  });

  if (isError) return <div>Error loading posts</div>;

  const posts = isLoading
    ? Array.from(new Array(3))
    : data?.data?.length
      ? data.data
      : [];

  // const [pageSize, setPageSize] = useState(1);
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setData((prevData) => [...prevData, ...data.data.results]);
  //   setLoading(false);
  // }, [pageSize]);

  // const handleScroll = () => {
  //   if (
  //     document.body.scrollHeight - 300 <
  //     window.scrollY + window.innerHeight
  //   ) {
  //     setLoading(true);
  //   }
  // };

  // function debounce(func, delay) {
  //   let timeoutId;
  //   return function (...args) {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }
  //     timeoutId = setTimeout(() => {
  //       func(...args);
  //     }, delay);
  //   };
  // }

  // window.addEventListener("scroll", debounce(handleScroll, 500));

  // useEffect(() => {
  //   if (loading == true) {
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // }, [loading]);

  return (
    <>
      {posts?.length ? (
        posts.map((item, index) => (
          <Box
            key={index}
            sx={{
              margin: "25px 400px",
              my: 5,
            }}
          >
            {item ? (
              <Post item={item} data={data} />
            ) : (
              <>
                <Skeleton
                  variant="rectangular"
                  height={500}
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
          No post available
        </Typography>
      )}
    </>
  );
}
