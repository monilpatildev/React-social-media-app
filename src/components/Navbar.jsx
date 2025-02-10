import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import UserProfileButton from "@components/UserProfileButton";
// Change this import to react-router-dom instead of react-router
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";
import CreatePost from "./CreatePost";
import { Tooltip } from "@mui/material";

export default function Navbar() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const navigate = useNavigate();

  const handleAddPost = () => {
    setShowCreatePost(!showCreatePost);
  };

  const handleVisitAllUsers = () => {
    navigate("/users");
  };
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">SocialGram</Link>
          </Typography>
          <Tooltip title="All Users">
            <PeopleAltIcon
              sx={{ mr: "30px", scale: "1.5", cursor: "pointer" }}
              onClick={handleVisitAllUsers}
            />
          </Tooltip>
          <Tooltip title="Create Post">
            <AddBoxIcon
              sx={{ mr: "30px", scale: "1.5", cursor: "pointer" }}
              onClick={handleAddPost}
            />
          </Tooltip>
          <UserProfileButton />
        </Toolbar>
      </AppBar>
      {showCreatePost &&
        createPortal(
          <CreatePost setShowCreatePost={setShowCreatePost} />,
          document.body,
        )}
    </>
  );
}
