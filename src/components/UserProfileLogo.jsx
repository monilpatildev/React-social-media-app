import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const UserProfileLogo = (user) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        cursor: "pointer",
        width: isSmallScreen ? "40px" : "50px",
        height: isSmallScreen ? "40px" : "50px",
        border: "1px solid grey",
        padding: "5px",
        borderRadius: "100px",
        backgroundColor: "rgba(0, 255, 255, 0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{ color: "text.secondary", fontSize: isSmallScreen ? 16 : 22 }}
      >
        {user?.user?.firstname?.[0]?.toUpperCase()}
        {user?.user?.lastname?.[0]?.toUpperCase()}
      </Typography>
    </Box>
  );
};

export default UserProfileLogo;
