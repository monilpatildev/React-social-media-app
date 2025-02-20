import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useParams, useLocation, useNavigate, Link } from "react-router";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
  Stack,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GridViewIcon from "@mui/icons-material/GridView";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import EditProfile from "@components/EditProfile";
import DeleteUserForm from "@components/DeleteUserForm";
import Navbar from "@components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useGetLoggedUserQuery, useGetUserQuery } from "../api/user/userApi";
import { setLoggedUserData } from "../api/user/userSlice";
import profileBg from "../assets/logo.png";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints?.down("sm"));

  const loggedUserData = useSelector((state) => state.user.loggedUserData);
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

    dispatch(setLoggedUserData(loggedUser?.data ? loggedUser?.data : null));
  }, [dispatch, id, location.pathname, loggedUser, navigate]);

  const isProfilePage = location.pathname === "/profile";
  const profileData = isProfilePage ? loggedUserData : user;

  const handleFollowersPage = () => {
    navigate(id ? `/user/${id}/followers` : "/user/followers");
  };

  const handleFollowingPage = () => {
    navigate(id ? `/user/${id}/following` : "/user/following");
  };

  const [editForm, setEditForm] = useState(false);
  const [deleteUserForm, setDeleteUserForm] = useState(false);

  if ((isProfilePage && loggedUserLoading) || (!isProfilePage && userLoading)) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress color="inherit" />
      </Box>
    );
  }
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  console.log(profileData);

  return (
    <>
      <Navbar />
      {!isSmallScreen && (
        <Typography
          sx={{
            ml: { xs: "16px", sm: "24px" },
            fontSize: "24px",
            position: "fixed",
            top: theme.spacing(12),
            zIndex: 1100,
            mt: "10px",
            color: "#2979ff",
          }}
          variant="text"
        >
          <Link
            to={-1}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              color: "inherit",
            }}
          >
            <ArrowBackIcon sx={{ mr: "5px" }} /> Back
          </Link>
        </Typography>
      )}

      {profileData ? (
        <Box
          sx={{
            maxWidth: 900,
            mx: isSmallScreen ? "35px" : "auto",
            mt: 10,
            mb: 4,
            bgcolor: "background.paper",
            boxShadow: 3,
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "relative",
              height: isSmallScreen ? 100 : 180,
              p: "20px",
              backgroundImage: `url(${profileBg})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundColor: "black",
              m: "20px",
              borderRadius: 3,
              backgroundRepeat: "no-repeat",
            }}
          />

          <Avatar
            src={profileData?.profilePictureUrl || ""}
            sx={{
              width: isSmallScreen ? 80 : 100,
              height: isSmallScreen ? 80 : 100,
              border: "4px solid white",
              position: "absolute",
              top: isSmallScreen ? 225 : 320,
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "grey.300",
              fontSize: "3rem",
            }}
          >
            {profileData?.firstname?.[0]?.toUpperCase()}
            {profileData?.lastname?.[0]?.toUpperCase()}
          </Avatar>

          <Box sx={{ mt: isSmallScreen ? 3 : 5, p: 3, textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {capitalize(profileData?.firstname)}{" "}
              {capitalize(profileData?.lastname)}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {profileData?.username} •{" "}
              {profileData?.isPrivate ? "Private Account" : "Public Account"}
            </Typography>{" "}
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              {profileData?.email}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Stack
              direction="row"
              justifyContent="center"
              spacing={4}
              sx={{ mb: 2 }}
            >
              <Button
                variant="outlined"
                onClick={handleFollowingPage}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  borderRadius: 2,
                  minWidth: 120,
                }}
              >
                <PeopleAltIcon sx={{ fontSize: 30, mb: 1 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {profileData?.totalFollowing}
                </Typography>
                <Typography variant="caption">Following</Typography>
              </Button>
              <Button
                variant="outlined"
                onClick={handleFollowersPage}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  borderRadius: 2,
                  minWidth: 120,
                }}
              >
                <PeopleAltIcon sx={{ fontSize: 30, mb: 1 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {profileData?.totalFollower}
                </Typography>
                <Typography variant="caption">Followers</Typography>
              </Button>
            </Stack>
            {isProfilePage && (
              <Stack
                direction="row"
                justifyContent="center"
                spacing={2}
                sx={{ mt: 3 }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setDeleteUserForm(true)}
                >
                  <PersonRemoveRoundedIcon sx={{ mr: "10px" }} /> Delete Account
                </Button>
                <Button variant="contained" onClick={() => setEditForm(true)}>
                  <BorderColorRoundedIcon sx={{ mr: "10px" }} /> Edit Profile
                </Button>
              </Stack>
            )}
            {/* Bottom Section: Posts, Likes & Saves */}
            <Divider sx={{ my: 3 }} />
            <Stack direction="row" justifyContent="center" spacing={4}>
              <Stack alignItems="center">
                <GridViewIcon sx={{ fontSize: 30, color: "text.secondary" }} />
                <Typography variant="caption">Posts</Typography>
              </Stack>
              <Stack alignItems="center">
                <FavoriteBorderIcon
                  sx={{ fontSize: 30, color: "text.secondary" }}
                />
                <Typography variant="caption">Likes</Typography>
              </Stack>
              <Stack alignItems="center">
                <BookmarkBorderIcon
                  sx={{ fontSize: 30, color: "text.secondary" }}
                />
                <Typography variant="caption">Saves</Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <CircularProgress color="inherit" />
        </Box>
      )}

      {/* Portals for modals */}
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
