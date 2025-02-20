import Navbar from "@components/Navbar";
import { Box, Skeleton, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useGetFollowRequestQuery } from "../api/follow/followApi";
import UserCard from "@components/UserCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router";

const FollowRequests = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: requestArray } = useGetFollowRequestQuery();

  return (
    <>
      <Navbar />
      {!isSmallScreen && (
        <Typography
          sx={{
            ml: { xs: "16px", sm: "24px" },
            fontSize: "24px",
            position: "fixed",
            top: theme.spacing(12),
            zIndex: 1100,
            mt: "10px",
            color: "#2979ff",
          }}
          variant="text"
        >
          <Link
            to={-1}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              color: "inherit",
            }}
          >
            <ArrowBackIcon sx={{ mr: "5px" }} /> Back
          </Link>
        </Typography>
      )}
      <Box
        sx={{
          pt: "30px",
          p: { xs: "10px", sm: "20px" },
        }}
      >
        {requestArray?.length ? (
          requestArray.map((item, index) => (
            <Box
              key={index}
              sx={{
                m: { xs: "10px", sm: "30px" },
                mx: { xs: "10px", sm: 50 },
                backgroundColor: "#f0f0f0",
                borderRadius: "12px",
                p: { xs: "10px", sm: "20px" },
              }}
            >
              {item ? (
                <UserCard item={item} />
              ) : (
                <Skeleton
                  variant="rectangular"
                  height={130}
                  sx={{
                    pr: 2,
                    m: { xs: "5px 10px", sm: "5px 10px" },
                    display: "flex",
                    p: "10px",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "14px",
                  }}
                />
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
              fontSize: { xs: 24, md: 38 },
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
