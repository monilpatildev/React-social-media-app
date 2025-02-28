/* eslint-disable react-hooks/exhaustive-deps */
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
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { useSearchFromURL } from "@utils/useSearchFromURL";
import { setSearchText, setSearchTextLoading } from "../api/post/postSlice";
import { useGetLoggedUserQuery } from "../api/user/userApi";
import { setLoggedUserData } from "../api/user/userSlice";
import logo from "../assets/logo.png";
import UserProfileButton from "@components/UserProfileButton";
import { createPortal } from "react-dom";
import CreatePost from "./CreatePost";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import { capitalize } from "@utils/string";

const Navbar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const loggedUserData = useSelector((state) => state.user.loggedUserData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: loggedUser } = useGetLoggedUserQuery();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const debounceTimeout = useRef(null);
  const searchFromURL = useSearchFromURL();
  const [localSearch, setLocalSearch] = useState(searchFromURL || "");
  const prevLocation = useRef(location.pathname);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const isHome = location.pathname === "/";
  const isSearchUser = location.pathname === "/users";

  const followType = location.pathname.endsWith("followers")
    ? "followers"
    : location.pathname.endsWith("following")
      ? "following"
      : null;

  useEffect(() => {
    document.body.style.overflow = showCreatePost ? "hidden" : "auto";
  }, [showCreatePost]);

  const handleSearchText = (e) => {
    const value = e.target.value;
    setLocalSearch(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    if (!value) {
      navigate(location.pathname);
    }
    dispatch(setSearchTextLoading(true));
  };

  useEffect(() => {
    if (localSearch) {
      debounceTimeout.current = setTimeout(() => {
        navigate(
          `${location.pathname}?search=${encodeURIComponent(localSearch)}`,
        );
        dispatch(setSearchText(localSearch));
        dispatch(setSearchTextLoading(false));
      }, 800);
    } else {
      dispatch(setSearchText(""));
      debounceTimeout.current = setTimeout(() => {
        dispatch(setSearchTextLoading(false));
      }, 800);
    }
  }, [dispatch, localSearch]);

  useEffect(() => {
    if (searchFromURL !== localSearch) {
      setLocalSearch(searchFromURL);
    }
  }, [searchFromURL]);

  useEffect(() => {
    dispatch(setLoggedUserData(loggedUser?.data || null));
  }, [loggedUser]);

  useEffect(() => {
    if (
      searchFromURL &&
      (location.pathname === "/" || location.pathname === "/users") &&
      prevLocation.current !== location.pathname
    ) {
      setLocalSearch("");
      dispatch(setSearchText(""));
      navigate(location.pathname, { replace: true });
    }
    prevLocation.current = location.pathname;
  }, [location.pathname, dispatch, navigate, searchFromURL]);

  const handleHomePage = () => {
    dispatch(setSearchText(""));
    setLocalSearch("");
    navigate("/");
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

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

  return (
    <>
      {loggedUserData ? (
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

            {(isHome || isSearchUser || followType) && (
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
                    isSearchUser || followType
                      ? "Search user..."
                      : "Search post title..."
                  }
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#f0f0f0",
                      borderRadius: "24px",
                      fontSize: isSmallScreen ? "14px" : "18px",
                      "& fieldset": { borderRadius: "24px" },
                    },
                    width: isSmallScreen ? "150px" : "500px",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="disabled" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
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
                  sx={{ p: 0.5 }}
                >
                  <MenuIcon sx={{ fontSize: 30 }} />
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
              sx={{ mt: "45px" }}
            >
              <MenuItem onClick={handleCreatePost}>
                {" "}
                <AddBoxIcon sx={{ mr: "8px", scale: "1", cursor: "pointer" }} />
                Create Post
              </MenuItem>
              <MenuItem onClick={handleAllUsers}>
                <PeopleAltIcon
                  sx={{ mr: "8px", scale: "1", cursor: "pointer" }}
                />
                Search Users
              </MenuItem>
              <MenuItem onClick={handleFollowRequest}>
                <FavoriteIcon
                  sx={{ mr: "8px", scale: "1", cursor: "pointer" }}
                />
                Follow Request
              </MenuItem>
            </Menu>
          )}
        </AppBar>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: isSmallScreen ? "50px auto" : "200px auto",
            width: "100%",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}

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
