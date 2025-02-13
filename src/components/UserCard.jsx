/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import UserProfileLogo from "./UserProfileLogo";

const UserCard = ({ item }) => {
  return (
    <Box
      sx={{
        pr: 2,
        margin: "5px 10px",
        display: "flex",
        padding: "10px",
        alignItems: "center",
        gap: "10px",
        borderRadius: "12px",
        backgroundColor: "#fff",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
      <Box sx={{ml:"30px"}}>

        <UserProfileLogo user={item}/>
      </Box>

        <Box
          sx={{
            pr: 2,
            margin: "10px 55px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="body2"
            fontSize={34}
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              maxWidth: "700px",
            }}
          >
            {item.firstname} {item.lastname}
          </Typography>
          <Typography
            variant="caption"
            fontSize={18}
            sx={{
              display: "block",
              color: "text.secondary",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              maxWidth: "1000px",
              fontStyle: "italic",
            }}
          >
            {item.email}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserCard;
