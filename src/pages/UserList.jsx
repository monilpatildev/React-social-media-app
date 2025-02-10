import Box from "@mui/material/Box";
import { useGetAllUsersQuery } from "../api/api";
import { useSearchParams } from "react-router-dom";
import { Skeleton, Typography } from "@mui/material";
import UserCard from "@components/UserCard";
import Navbar from "@components/Navbar";

export default function UserList() {
  const [searchParams] = useSearchParams();
  const pageSize = Number(searchParams.get("pageSize")) || 20;
  const pageNumber = Number(searchParams.get("pageNumber")) || 1;
  const { data, isLoading, isError } = useGetAllUsersQuery({
    pageSize,
    pageNumber,
  });

  if (isError) return <div>Error loading posts</div>;

  const posts = isLoading
    ? Array.from(new Array(3))
    : data?.data?.length
      ? data.data
      : [];

  return (
    <>
      <Navbar />
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
          No post available
        </Typography>
      )}
    </>
  );
}
