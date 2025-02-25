import Box from "@mui/material/Box";
import { Skeleton, Typography, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useGetFollowRequestQuery } from "../api/follow/followApi";
import UserCard from "@components/UserCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom"; // Ensure you're using react-router-dom
import Navbar from "@components/Navbar";

const FollowRequests = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: requestArray, isLoading } = useGetFollowRequestQuery({
    refetchOnMountOrArgChange: true,
  });


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
            onClick={() => navigate(-1)}
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
          p: isSmallScreen ? "10px" : "20px 400px",
          mt: isSmallScreen ? "10px" : "30px",
        }}
      >
        {!isLoading ? (
          requestArray?.length ? (
            <Grid container spacing={2}>
              {requestArray.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <UserCard item={item} pageType="followRequest" />
                </Grid>
              ))}
            </Grid>
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
          )
        ) : (
          <Grid container spacing={2}>
            {Array.from("12345").map((_, index) => (
              <Grid item xs={12} key={index}>
                <Skeleton
                  variant="rectangular"
                  height={110}
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "14px",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default FollowRequests;
