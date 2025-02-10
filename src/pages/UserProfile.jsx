import EditProfile from "@components/EditProfile";
import Navbar from "@components/Navbar";
import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import profileBg from "../assets/profile_bg.jpg";
import DeleteUserForm from "@components/DeleteUserForm";
import { setLoggedUserData } from "../api/user/userSlice";
import { useGetLoginUserQuery, useGetUserQuery } from "../api/api";
import { useParams, useLocation } from "react-router";

const UserProfile = () => {
  const userData = useSelector((state) => state.user.loggedUserData);
  const [editForm, setEditForm] = useState(false);
  const [deleteUserForm, setDeleteUserForm] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();

  const { data: loggedUser, isLoading: loggedUserLoading } =
    useGetLoginUserQuery();
  const { data: user, isLoading: userLoading } = useGetUserQuery(id, {
    skip: !id,
  });

  useEffect(() => {
    if (loggedUser?.data) {
      dispatch(setLoggedUserData(loggedUser.data));
    }
  }, [dispatch, loggedUser]);

  const isProfilePage = location.pathname === "/profile";
  const profileData = isProfilePage ? userData : user;

  if ((isProfilePage && loggedUserLoading) || (!isProfilePage && userLoading)) {
    return (
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
    );
  }

  return (
    <>
      <Navbar />
      {profileData ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            padding: "10px 300px",
            width: "100%",
          }}
        >
          <Box sx={{ height: "20px" }}>
            <img
              src={profileBg}
              alt="Profile Background"
              style={{
                objectFit: "cover",
                height: "500px",
                width: "100%",
                marginTop: "120px",
                borderRadius: "24px",
                boxShadow: "1px 0px 10px rgba(0,0,0,0.2)",
              }}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <CardContent>
              <Typography sx={{ color: "text.secondary", fontSize: 32 }}>
                {isProfilePage ? "Your Profile" : "User Profile"}
              </Typography>
            </CardContent>
            <CardContent
              sx={{
                width: "100%",
                paddingTop: "80px",
                paddingBottom: "0px",
                justifyContent: "space-between",
                borderRadius: "24px",
              }}
            >
              <Box
                sx={{
                  padding: "25px 50px",
                  marginLeft: "140px",
                  boxShadow: "1px 0px 10px rgba(0,0,0,0.2)",
                  borderRadius: "24px",
                  backgroundColor: "rgba(0, 255, 255, 0.1)",
                  width: "140px",
                  marginBottom: "25px",
                }}
              >
                <Typography sx={{ color: "text.secondary", fontSize: 42 }}>
                  {profileData?.firstname?.[0]?.toUpperCase()}
                </Typography>
              </Box>
              <CardContent
                sx={{
                  width: "100%",
                  paddingTop: "0px",
                  display: "flex",
                  justifyContent: "space-around",
                  borderRadius: "24px",
                }}
              >
                <Box
                  sx={{
                    padding: "25px",
                    boxShadow: "1px 0px 10px rgba(0,0,0,0.2)",
                    borderRadius: "24px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: 28,
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      maxWidth: "650px",
                    }}
                  >
                    {profileData?.firstname} {profileData?.lastname}
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: 16,
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      maxWidth: "650px",
                    }}
                  >
                    Username: {profileData?.username}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", fontSize: 16 }}>
                    Account:{" "}
                    {profileData?.isPrivate
                      ? "Private Account"
                      : "Public Account"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <Box
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
                        fontSize: 24,
                      }}
                    >
                      {profileData?.following?.length || 0}
                    </Typography>
                    <Typography
                      gutterBottom
                      sx={{
                        color: "text.primary",
                        width: "100%",
                        fontSize: 24,
                      }}
                    >
                      {profileData?.follower?.length || 0}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "text.primary",
                        fontSize: 18,
                        fontWeight: "600",
                        width: "100%",
                      }}
                    >
                      Following
                    </Typography>

                    <Typography
                      sx={{
                        color: "text.primary",
                        fontSize: 18,
                        fontWeight: "600",
                        width: "100%",
                      }}
                    >
                      Followers
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </CardContent>
            {isProfilePage && (
              <CardContent sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 16,
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "20px",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => setDeleteUserForm(true)}
                    color="error"
                  >
                    Delete Account
                  </Button>
                  <Button variant="contained" onClick={() => setEditForm(true)}>
                    Edit Profile
                  </Button>
                </Typography>
              </CardContent>
            )}
          </Box>
        </Box>
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
      {editForm &&
        createPortal(
          <EditProfile setEditForm={setEditForm} userData={userData} />,
          document.body,
        )}
      {deleteUserForm &&
        createPortal(
          <DeleteUserForm setDeleteUserForm={setDeleteUserForm} />,
          document.body,
        )}
    </>
  );
};

export default UserProfile;
