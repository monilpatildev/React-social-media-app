import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Navbar from "./Navbar";
import PostList from "./PostList";
import { Tooltip } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { createPortal } from "react-dom";
import CreatePost from "./CreatePost";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const navigate = useNavigate();

  const handleAddPost = () => {
    setShowCreatePost(!showCreatePost);
  };

  const handleVisitAllUsers = () => {
    navigate("/users");
  };

  useEffect(()=>{
    if(showCreatePost){
      document.body.style.overflow = "hidden"
    }else{
      document.body.style.overflow = "auto";

    }
  },[showCreatePost])

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#f0f0f0",
        height: "100%",
        minHeight: "905px",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: "none" }}
      >
        <Navbar />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          zIndex: "10",

          [`& .MuiDrawer-paper`]: {
            width: 280,
            boxSizing: "border-box",
            backgroundColor: "#f0f0f0",
            border: "none",
            padding: "35px",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ borderRadius: "24px", marginTop: "50px" }}>
          <List sx={{ borderRadius: "24px" }}>
            <ListItemButton onClick={handleVisitAllUsers}>
              <ListItemIcon>
                <Tooltip title="All Users">
                  <PeopleAltIcon
                    sx={{ mr: "30px", scale: "1.2", cursor: "pointer" }}
                  />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary={"All Users"} />
            </ListItemButton>

            <ListItemButton onClick={handleAddPost}>
              <ListItemIcon>
                <Tooltip title="Create Post">
                  <AddBoxIcon
                    sx={{ mr: "30px", scale: "1.5", cursor: "pointer" }}
                  />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary={"Create Post"} />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      <Box
        component="div"
        sx={{ flexGrow: 1, width: "100%", height: "100%", marginTop: "100px" }}
      >
        <PostList />
      </Box>
      {showCreatePost &&
        createPortal(
          <CreatePost
            setShowCreatePost={setShowCreatePost}
            showCreatePost={showCreatePost}
          />,
          document.body,
        )}
    </Box>
  );
}
