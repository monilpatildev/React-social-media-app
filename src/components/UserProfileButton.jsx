import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "js-cookie";
import UserProfileLogo from "./UserProfileLogo";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { setLoggedUserData } from "../api/user/userSlice";
import { setAuthToken, setUserLoggedIn } from "../api/auth/authSlice";
import { baseApi } from "../api/baseApi";

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
          alt="Travis Howard"
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
          sx={{ width: "150px", fontSize: "22px", textAlign: "center" }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{ width: "150px", fontSize: "22px", textAlign: "center" }}
        >
          Logout
        </MenuItem>
        <ToastContainer />
      </Menu>
    </>
  );
}
