import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddBoxIcon from "@mui/icons-material/AddBox";

import UserProfileButton from "@components/UserProfileButton";
const handleAddPost = () => {
  console.log("hell");
};

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SocialGram
          </Typography>
          <AddBoxIcon
            sx={{ mr: "30px", scale: "1.5" }}
            onClick={handleAddPost}
          />
          <UserProfileButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
