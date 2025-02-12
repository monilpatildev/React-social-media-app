
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setAuthToken, setUserLoggedIn } from "../api/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";
import userImage from "../assets/user.svg";
import { setLoggedUserData } from "../api/user/userSlice";
import { useState } from "react";

export default function UserProfileButton() {
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
    Cookies.remove("token");
    toast.success("Log out successfully!", {
      autoClose: 500,
      onClose: () => {
        dispatch(setAuthToken(null));
        dispatch(setUserLoggedIn(false));
        dispatch(setLoggedUserData(null));
      },
    });
  };
  return (
    <>
      <Stack direction="row" spacing={2} sx={{ minWidth: "180px" ,mr:"20px"}} >
        <Avatar
          alt="Travis Howard"
          src={userImage}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ cursor: "pointer" ,left:"90%"}}
        />
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
