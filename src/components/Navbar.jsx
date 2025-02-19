import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { useSearchFromURL } from "@utils/useSearchFromURL";
import { setSearchText, setSearchTextLoading } from "../api/post/postSlice";
import { useGetLoggedUserQuery } from "../api/user/userApi";
import { setLoggedUserData, setUserIsLoading } from "../api/user/userSlice";
import logo from "../assets/logo.png";
import UserProfileButton from "@components/UserProfileButton";
import { createPortal } from "react-dom";
import CreatePost from "./CreatePost";

const Navbar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const loggedUserData = useSelector((state) => state.user.loggedUserData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: loggedUser, isLoading } = useGetLoggedUserQuery();
  const [showCreatePost, setShowCreatePost] = useState(false);

  const isHome = location.pathname === "/";
  const isSearchUser = location.pathname === "/users";

  useEffect(() => {
    document.body.style.overflow = showCreatePost ? "hidden" : "auto";
  }, [showCreatePost]);

  const debounceTimeout = useRef(null);
  const searchFromURL = useSearchFromURL();
  const [localSearch, setLocalSearch] = useState(searchFromURL || "");

  const handleSearchText = (e) => {
    const value = e.target.value;
    setLocalSearch(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    if (value) {
      navigate(`${location.pathname}?search=${encodeURIComponent(value)}`);
    } else {
      navigate(location.pathname);
    }
    dispatch(setSearchTextLoading(true));
    debounceTimeout.current = setTimeout(() => {
      dispatch(setSearchTextLoading(false));
    }, 1500);
  };

  useEffect(() => {
    if (localSearch) {
      debounceTimeout.current = setTimeout(() => {
        dispatch(setSearchText(localSearch));
      }, 800);
    } else {
      dispatch(setSearchText(""));
    }
  }, [dispatch, localSearch]);

  useEffect(() => {
    if (searchFromURL !== localSearch) {
      setLocalSearch(searchFromURL);
    }
  }, [searchFromURL]);


  useEffect(() => {
    dispatch(setLoggedUserData(loggedUser?.data || null));
    dispatch(setUserIsLoading(loggedUser?.data ? isLoading : !isLoading));
  }, [dispatch, loggedUser, isLoading]);

  const handleHomePage = () => {
    dispatch(setSearchText(""));
    setLocalSearch("");
    navigate("/");
  };

  const prevLocation = useRef(location.pathname);
  useEffect(() => {
    if (
      (location.pathname === "/" || location.pathname === "/users") &&
      prevLocation.current !== location.pathname
    ) {
      setLocalSearch("");
      dispatch(setSearchText(""));
      navigate(location.pathname, { replace: true });
    }
    prevLocation.current = location.pathname;
  }, [location.pathname, dispatch, navigate]);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleCreatePost = () => {
    setShowCreatePost(!showCreatePost);
    handleMenuClose();
  };
  const handleAllUsers = () => {
    navigate("/users");
    handleMenuClose();
  };
  const handleFollowRequest = () => {
    navigate("/follow-request");
    handleMenuClose();
  };

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  return (
    <>
      <AppBar position="sticky" sx={{ boxShadow: "none", zIndex: 10 }}>
        <Toolbar
          sx={{
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: isSmallScreen ? "10px" : "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: isSmallScreen ? "1" : "0 0 300px",
            }}
          >
            <Box
              onClick={handleHomePage}
              component="img"
              src={logo}
              alt="logo"
              sx={{
                height: isSmallScreen ? "40px" : "50px",
                objectFit: "contain",
                cursor: "pointer",
              }}
            />
          </Box>

          {(isHome || isSearchUser) && (
            <Box
              sx={{
                display: "flex",
                mx: isSmallScreen ? 0 : 2,
                justifyContent: "center",
              }}
            >
              <TextField
                required
                type="search"
                value={localSearch}
                onChange={handleSearchText}
                placeholder={
                  isSearchUser ? "Search user..." : "Search post title..."
                }
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "24px",
                    fontSize: isSmallScreen ? "12px" : "18px",
                    "& fieldset": { borderRadius: "24px" },
                  },
                  width: isSmallScreen ? "150px" : "500px",
                }}
              />
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flex: isSmallScreen ? "1" : "0 0 300px",
            }}
          >
            {!isSmallScreen && (
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: isSmallScreen ? 20 : 28,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {capitalize(loggedUserData?.firstname)}{" "}
                {capitalize(loggedUserData?.lastname)}
              </Typography>
            )}

            <UserProfileButton />
            {isSmallScreen && (
              <IconButton
                onClick={handleMenuOpen}
                size="large"
                edge="end"
                color="default"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>

        {isSmallScreen && (
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "center",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "left",
            }}
            sx={{ mt: "45px", mr: "0" }}
          >
            <MenuItem onClick={handleCreatePost}>Create Post</MenuItem>
            <MenuItem onClick={handleAllUsers}>All Users</MenuItem>
            <MenuItem onClick={handleFollowRequest}>Follow Request</MenuItem>
          </Menu>
        )}
      </AppBar>
      {showCreatePost &&
        createPortal(
          <CreatePost
            setShowCreatePost={setShowCreatePost}
            showCreatePost={showCreatePost}
          />,
          document.body,
        )}
    </>
  );
};

export default Navbar;
