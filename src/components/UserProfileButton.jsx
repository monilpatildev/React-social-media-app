import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "js-cookie";
import UserProfileLogo from "./UserProfileLogo";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { setLoggedUserData } from "../api/user/userSlice";
import { setAuthToken, setUserLoggedIn } from "../api/auth/authSlice";
import { baseApi } from "../api/baseApi";
import { useMediaQuery, useTheme } from "@mui/material";

export default function UserProfileButton() {
  const loggedUserData = useSelector((state) => state.user.loggedUserData);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfilePage = () => {
    navigate("/profile");
    setAnchorEl(null);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    toast.success("Log out successfully!", {
      autoClose: 500,
      onClose: () => {
        dispatch(setLoggedUserData(null));
        dispatch(setAuthToken(null));
        Cookies.remove("token");
        dispatch(setUserLoggedIn(false));
        dispatch(baseApi.util.resetApiState());
      },
    });
  };

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mx: "20px" }}>
        <Avatar
          alt="User Avatar"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            cursor: "pointer",
            width: "45px",
            height: "50px",
            backgroundColor: "white",
          }}
        >
          <UserProfileLogo user={loggedUserData} />
        </Avatar>
      </Stack>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={handleProfilePage}
          sx={{
            width: isSmallScreen ? "120px" : "180px", 
            fontSize: isSmallScreen ? "18px" : "22px",
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{
            width: isSmallScreen ? "120px" : "180px", 
            fontSize: isSmallScreen ? "18px" : "22px",
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
