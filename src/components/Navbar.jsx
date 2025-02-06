import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddBoxIcon from "@mui/icons-material/AddBox";

import UserProfileButton from "@components/UserProfileButton";
import { Link } from "react-router";

export default function Navbar() {

  const handleAddPost = () => {
    console.log("hell");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <Link to={"/"}>   SocialGram</Link>
         
          </Typography>
          <AddBoxIcon
            sx={{ mr: "30px", scale: "1.5", cursor: "pointer" }}
            onClick={handleAddPost}
          />
          <UserProfileButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
