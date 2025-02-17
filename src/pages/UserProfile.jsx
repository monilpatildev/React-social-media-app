/* eslint-disable react-hooks/exhaustive-deps */
import EditProfile from "@components/EditProfile";
import Navbar from "@components/Navbar";
import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import profileBg from "../assets/logo.png";
import { useParams, useLocation, useNavigate, Link } from "react-router";
import { useGetLoggedUserQuery, useGetUserQuery } from "../api/user/userApi";
import { setLoggedUserData } from "../api/user/userSlice";
import PersonIcon from "@mui/icons-material/Person";
import DeleteUserForm from "@components/DeleteUserForm";
import LockIcon from "@mui/icons-material/Lock";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UserProfile = ()=> {
  const loggedUserData = useSelector((state) => state.user.loggedUserData);
  const [editForm, setEditForm] = useState(false);
  const [deleteUserForm, setDeleteUserForm] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { data: loggedUser, isLoading: loggedUserLoading } =
    useGetLoggedUserQuery();
  const { data: user, isLoading: userLoading } = useGetUserQuery(id, {
    skip: !id,
  });

  useEffect(() => {
    if (
      location.pathname !== "/profile" &&
      (!id || location.pathname === "/user" || id.length !== 24)
    ) {
      navigate("/");
    }

    if (loggedUser?.data) {
      dispatch(setLoggedUserData(loggedUser.data));
    } else {
      dispatch(setLoggedUserData(null));
    }
  }, [dispatch, id, location.pathname, loggedUser]);

  const isProfilePage = location.pathname === "/profile";
  const profileData = isProfilePage ? loggedUserData : user;

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

  const handleFollowersPage = () => {
    if (id) {
      navigate(`/user/${id}/followers`);
    } else {
      navigate("/user/followers");
    }
  };

  const handleFollowingPage = () => {
    if (id) {
      navigate(`/user/${id}/following`);
    } else {
      navigate("/user/following");
    }
  };

  return (
    <>
      <Navbar />
      <Button sx={{ ml: "24px", fontSize: "24px" ,position:"fixed"}}>
        <Link to={-1}>
          {" "}
          <ArrowBackIcon sx={{ mr: "5px" }} /> Back{" "}
        </Link>
      </Button>
      {profileData ? (
        <>
          <Stack direction="column" spacing={2} mx={50} p={5}>
            <Typography sx={{ color: "text.secondary", fontSize: 32 }}>
              {isProfilePage ? "Your Profile" : "User Profile"}
            </Typography>
            <Stack
              spacing={2}
              borderRadius={8}
              p={5}
              my={10}
              boxShadow={"1px 0px 10px rgba(0,0,0,0.3)"}
              bgcolor={"white"}
            >
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  justifyContent: "center",
                  borderRadius: "24px",
                  alignItems: "center",
                }}
              >
                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{
                    boxShadow: "1px 0px 10px rgba(0,0,0,0.2)",
                    borderRadius: "28px",
                    backgroundColor: "rgba(0, 255, 255, 0.1)",
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <Typography sx={{ color: "text.secondary", fontSize: 38 }}>
                    {profileData?.firstname?.[0]?.toUpperCase()}
                    {profileData?.lastname?.[0]?.toUpperCase()}
                  </Typography>
                </Stack>
                <Stack width={"100%"} alignItems={"end"}>
                  <img
                    src={profileBg}
                    alt="Profile Background"
                    style={{
                      objectFit: "cover",
                      height: "100px",
                      width: "280px",
                      borderRadius: "24px",
                    }}
                  />
                </Stack>
              </Stack>
              <Divider sx={{ mb: "15px" }} />
              <Stack
                spacing={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box
                  sx={{
                    padding: "25px",
                  }}
                >
                  <Stack
                    direction={"row"}
                    justifyContent={"start"}
                    alignItems={"center"}
                  >
                    <PersonIcon sx={{ color: "grey" }} />
                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontSize: 32,
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        maxWidth: "650px",
                        ml: "10px",
                      }}
                    >
                      {profileData?.firstname} {profileData?.lastname}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    justifyContent={"start"}
                    alignItems={"center"}
                  >
                    <DriveFileRenameOutlineIcon sx={{ color: "grey" }} />
                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontSize: 18,
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        maxWidth: "650px",
                        ml: "10px",
                      }}
                    >
                      {profileData?.username}
                    </Typography>
                  </Stack>{" "}
                  <Stack
                    direction={"row"}
                    justifyContent={"start"}
                    alignItems={"center"}
                  >
                    <LockIcon sx={{ color: "grey" }} />
                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontSize: 18,
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        maxWidth: "650px",
                        ml: "10px",
                      }}
                    >
                      {profileData?.isPrivate
                        ? "Private Account"
                        : "Public Account"}
                    </Typography>{" "}
                  </Stack>
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
                      onClick={handleFollowingPage}
                      sx={{
                        color: "text.primary",
                        width: "100%",
                        fontSize: 24,
                        cursor: "pointer",
                      }}
                    >
                      <PeopleAltIcon sx={{ mr: "10px", color: "grey" }} />
                      {profileData?.totalFollowing}
                    </Typography>
                    <Typography
                      gutterBottom
                      onClick={handleFollowersPage}
                      sx={{
                        color: "text.primary",
                        width: "100%",
                        fontSize: 24,
                        cursor: "pointer",
                      }}
                    >
                      <PeopleAltIcon sx={{ mr: "10px", color: "grey" }} />
                      {profileData?.totalFollower}
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
              </Stack>
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
                    <Button
                      variant="contained"
                      onClick={() => setEditForm(true)}
                    >
                      Edit Profile
                    </Button>
                  </Typography>
                </CardContent>
              )}{" "}
            </Stack>
          </Stack>
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
      {editForm &&
        createPortal(
          <EditProfile
            setEditForm={setEditForm}
            loggedUserData={loggedUserData}
          />,
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
