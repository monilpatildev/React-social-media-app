import EditProfile from "@components/EditProfile";
import Navbar from "@components/Navbar";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const userData = useSelector((state) => state.user.loggedUserData);
  const [editForm, setEditForm] = useState(false);

  const handleDeleteUser = () => {};
  const handleEditProfile = () => {
    setEditForm(!editForm);
    console.log(editForm);
  };
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          padding: "100px ",   
          flexDirection: "column",
        }}
      >
        
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 32 }}
            >
              Your Profile
            </Typography>
          </CardContent>
          <CardContent
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 24 }}
            >
              {userData.firstname} {userData.lastname}
            </Typography>

            <Box
              component="div"
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                textAlign: "center",
              }}
            >
              <Box
                component="div"
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  gutterBottom
                  sx={{
                    color: "text.primary",
                    width: "100%",
                    fontSize: 20,
                  }}
                >
                  {userData.following.length}
                </Typography>

                <Typography
                  gutterBottom
                  sx={{
                    color: "text.primary",
                    width: "100%",
                    fontSize: 20,
                  }}
                >
                  {userData.follower.length}
                </Typography>
              </Box>
              <Box
                component="div"
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  gutterBottom
                  sx={{
                    color: "text.primary",
                    fontSize: 14,
                    fontWeight: "600",
                    width: "100%",
                  }}
                >
                  following
                </Typography>

                <Typography
                  gutterBottom
                  sx={{
                    color: "text.primary",
                    fontSize: 14,
                    fontWeight: "600",
                    width: "100%",
                  }}
                >
                  follower
                </Typography>
              </Box>
            </Box>
          </CardContent>
          <CardContent
            sx={{
              width: "100%",
            }}
          >
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 16 }}
            >
              Username : {userData.username}
            </Typography>
            <Typography
              gutterBottom
              sx={{
                color: "text.secondary",
                fontSize: 16,
                display: "flex",
                justifyContent: "space-around",
                margin: "20px",
              }}
            >
              <Button variant="contained" onClick={handleDeleteUser}>
                Delete Account
              </Button>{" "}
              <Button variant="contained" onClick={handleEditProfile}>
                Edit Profile
              </Button>{" "}
            </Typography>
          </CardContent>

      </Box>
      {editForm &&
        createPortal(
          <EditProfile setEditForm={setEditForm} userData={userData} />,
          document.body,
        )}
    </>
  );
};

export default UserProfile;
