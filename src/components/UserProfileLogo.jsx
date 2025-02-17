import { Box, Typography } from "@mui/material";

const UserProfileLogo = (user) => {
  
  return (
    <Box
      sx={{
        cursor: "pointer",
        width: "55px",
        height: "55px",
        border: "1px solid grey",
        padding: "5px",
        borderRadius: "100px",
        backgroundColor: "rgba(0, 255, 255, 0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{ color: "text.secondary", fontSize:22 }}>
        {user?.user?.firstname?.[0]?.toUpperCase()}
        {user?.user?.lastname?.[0]?.toUpperCase()}
      </Typography>
    </Box>
  );
};

export default UserProfileLogo;
