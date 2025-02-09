import { Avatar, Box, Stack, Typography } from "@mui/material";
import userImage from "../assets/user.svg";


const UserCard = ({ item }) => {


  return (
    <div>
      <Box
        sx={{
          pr: 2,
          margin: "5px 10px",
          display: "flex",
          padding: "10px",
          alignItems: "center",
          gap: "10px",
          borderRadius: "12px",
          boxShadow: "1px 0px 10px rgba(0,0,0,0.2)",
        }}
      >
        <Stack direction="row" spacing={2} sx={{ margin: "5px 30px" }}>
          <Avatar
            alt="Travis Howard"
            src={userImage}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            sx={{
              cursor: "pointer",
              width: "60px",
              height: "60px",
              border: "1px solid grey",
              padding: "5px",
            }}
          />
        </Stack>
        <Box
          sx={{
            pr: 2,
            margin: "10px 25px",
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
    </div>
  );
};

export default UserCard;
