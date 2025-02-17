/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import UserProfileButton from "@components/UserProfileButton";
import { useLocation, useNavigate } from "react-router-dom";
import { AppBar, Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useSearchFromURL } from "@utils/useSearchFromURL";
import { setSearchText, setSearchTextLoading } from "../api/post/postSlice";
import { useGetLoggedUserQuery } from "../api/user/userApi";
import { setLoggedUserData, setUserIsLoading } from "../api/user/userSlice";
import logo from "../assets/logo.png";

const Navbar = () => {
  const loggedUserData = useSelector((state) => state.user.loggedUserData);
  const reduxSearchText = useSelector((state) => state.post.searchText);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: loggedUser, isLoading } = useGetLoggedUserQuery();

  const isNavbar = location.pathname === "/";

  useEffect(() => {
    if (loggedUser?.data) {
      dispatch(setLoggedUserData(loggedUser.data));
      dispatch(setUserIsLoading(isLoading));
    } else {
      dispatch(setLoggedUserData(null));
      dispatch(setUserIsLoading(!isLoading));
    }
  }, [dispatch, loggedUser]);

  const debounceTimeout = useRef(null);
  const searchFromURL = useSearchFromURL();

  const [localSearch, setLocalSearch] = useState(
    searchFromURL || reduxSearchText || "",
  );

  const handleSearchText = (e) => {
    const value = e.target.value;
    setLocalSearch(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    if (value) {
      navigate(`/?search=${encodeURIComponent(value)}`);
    } else {
      navigate(`/`);
    }
    dispatch(setSearchTextLoading(true));
    debounceTimeout.current = setTimeout(() => {
      dispatch(setSearchTextLoading(false));
    }, 1500);
  };

  useEffect(() => {
    if (searchFromURL !== localSearch) {
      setLocalSearch(searchFromURL);
    }
    if (localSearch) {
      debounceTimeout.current = setTimeout(() => {
        dispatch(setSearchText(localSearch));
      }, 800);
    }
    if (!searchFromURL) {
      dispatch(setSearchText(searchFromURL));
    }
  }, [searchFromURL]);

  const handleHomePage = () => {
    if(reduxSearchText){
      navigate(`/?search=${encodeURIComponent(reduxSearchText)}`);
    }else{
      navigate("/")
    }
  };

  return (
    <AppBar position="sticky" sx={{ boxShadow: "none", zIndex: "10" }}>
      <Toolbar
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{ color: "black", width: "300px" }}
        >
          <Box
            onClick={handleHomePage}
            component="img"
            src={logo}
            alt="logo"
            sx={{
              ml: "20px",
              height: "50px",
              objectFit: "contain",
              cursor:"pointer"
            }}
          />
        </Typography>
        {isNavbar ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "30%",
            }}
          >
            <TextField
              required
              type="search"
              value={localSearch}
              onChange={handleSearchText}
              placeholder="Search post title..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#f0f0f0",
                  borderRadius: "48px",
                  "& fieldset": {
                    borderRadius: "48px",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "8px",
                },
                width: "100%",
              }}
            />
          </Box>
        ) : (
          ""
        )}

        <Box
          sx={{
            color: "black",
            display: "flex",
            alignItems: "center",
            width: "300px",
            justifyContent: "end",
          }}
        >
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 28,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {loggedUserData?.username}
          </Typography>
          <UserProfileButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
