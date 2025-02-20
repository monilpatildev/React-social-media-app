/* eslint-disable react/prop-types */

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar({
  showCreatePost,
  setShowCreatePost,
  mobileOpen,
  handleDrawerToggle,
}) {
  const userIsLoading = useSelector((state) => state.user.userIsLoading);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAddPost = () => {
    setShowCreatePost(!showCreatePost);
  };
  const handleVisitAllUsers = () => {
    navigate("/users");
  };
  const handleActivity = () => {
    navigate("/follow-request");
  };

  const drawerContent = (
    <Box sx={{ borderRadius: "24px", mt: isMobile ? 2 : "100px" }}>
      <List sx={{ borderRadius: "24px" }}>
        <ListItemButton onClick={handleVisitAllUsers}>
          <ListItemIcon>
            <Tooltip title="Search Users">
              <PeopleAltIcon
                sx={{ mr: "30px", scale: "1.2", cursor: "pointer" }}
              />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Search Users" />
        </ListItemButton>

        <ListItemButton onClick={handleAddPost}>
          <ListItemIcon>
            <Tooltip title="Create Post">
              <AddBoxIcon
                sx={{ mr: "30px", scale: "1.5", cursor: "pointer" }}
              />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Create Post" />
        </ListItemButton>
        <ListItemButton onClick={handleActivity}>
          <ListItemIcon>
            <Tooltip title="Follow Requests">
              <FavoriteIcon
                sx={{ mr: "30px", scale: "1.5", cursor: "pointer" }}
              />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Follow Requests" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      {!userIsLoading ? (
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={isMobile ? handleDrawerToggle : undefined}
          sx={{
            width: isMobile ? 200 : 280,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: isMobile ? 200 : 280,
              boxSizing: "border-box",
              backgroundColor: "#f0f0f0",
              border: "none",
              padding: isMobile ? "20px" : "35px",
              zIndex: 0,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: isMobile ? "50px auto" : "200px auto",
            width: "100%",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}
    </>
  );
}

