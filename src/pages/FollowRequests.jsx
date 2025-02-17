import Navbar from "@components/Navbar";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useGetFollowRequestQuery } from "../api/follow/followApi";
import UserCard from "@components/UserCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router";

const FollowRequests = () => {
  const { data: requestArray } = useGetFollowRequestQuery();
  console.log(requestArray);
  
  return (
    <>
      <Navbar />
      <Button sx={{ ml: "24px", fontSize: "24px", position: "fixed" }}>
        <Link to={-1}>
          {" "}
          <ArrowBackIcon sx={{ mr: "5px" }} /> Back{" "}
        </Link>
      </Button>
      <Box
        sx={{
          paddingTop: "30px",
          p: "20px",
        }}
      >
        {requestArray?.length ? (
          requestArray.map((item, index) => (
            <Box
              key={index}
              sx={{
                m: "30px",
                mx: 50,
                backgroundColor: "#f0f0f0",
              }}
            >
              {item ? (
                <UserCard item={item} />
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
              mt: "100px",
              textAlign: "center",
              fontSize: 38,
              width: "100%",
            }}
          >
            No Requests!!
          </Typography>
        )}
      </Box>
    </>
  );
};

export default FollowRequests;
