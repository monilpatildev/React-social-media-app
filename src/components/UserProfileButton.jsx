import * as React from "react";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../api/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";
import userImage from "../assets/user.svg"

export default function UserProfileButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userData = useSelector((state) => state.user.loggedUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  console.log("userData", userData);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfilePage =()=>{
    navigate("/profile")
  }

  const handleLogout = () => {
    Cookies.remove("token");
    toast.success("Log out successfully!", {
      autoClose: 500,
      onClose: () => {
        navigate("/signin");
        dispatch(setAccessToken(false));
      },
    });
  };
  return (
    <>
    
      <Stack direction="row" spacing={2}>
        <Avatar
          alt="Travis Howard"
          src={userImage}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ cursor: "pointer" }}
        />
      </Stack>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ minWidth: "200px" }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleProfilePage} sx={{ width: "100px" }}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <ToastContainer />
    </>
  );
}
