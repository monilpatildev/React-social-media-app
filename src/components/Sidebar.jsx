/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CircularProgress, Tooltip } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Sidebar({ showCreatePost, setShowCreatePost }) {
  const userIsLoading = useSelector((state) => state.user.userIsLoading);
  const navigate = useNavigate();

  const handleAddPost = () => {
    setShowCreatePost(!showCreatePost);
  };
  const handleVisitAllUsers = () => {
    navigate("/users");
  };
  const handleActivity = () => {
    navigate("/follow-request");
  };
  return (
    <>
      {!userIsLoading ? (
        <>
          <Drawer
            variant="permanent"
            sx={{
              width: 280,

              [`& .MuiDrawer-paper`]: {
                width: 280,
                boxSizing: "border-box",
                backgroundColor: "#f0f0f0",
                border: "none",
                padding: "35px",
                zIndex: "0",
              },

            }}
          >
            <Box sx={{ borderRadius: "24px", marginTop: "100px" }}>
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
                <ListItemButton onClick={handleActivity}>
                  <ListItemIcon>
                    <Tooltip title="Follow Requests">
                      <FavoriteIcon
                        sx={{ mr: "30px", scale: "1.5", cursor: "pointer" }}
                      />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary={"Follow Requests"} />
                </ListItemButton>
              </List>
            </Box>
          </Drawer>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "200px auto",
            width: "100%",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}
    </>
  );
}
