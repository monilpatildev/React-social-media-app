/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import UserProfileButton from "@components/UserProfileButton";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Box, TextField } from "@mui/material";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setSearchTextLoading } from "../api/post/postSlice";
import { useSearchFromURL } from "@utils/useSearchFromURL";
import { useGetLoggedUserQuery } from "../api/api";
import { setLoggedUserData, setUserIsLoading } from "../api/user/userSlice";


const Navbar = () => {
  const loggedUserData = useSelector((state) => state.user.loggedUserData);
  const reduxSearchText = useSelector((state) => state.post.searchText);
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const { data: loggedUser, isLoading } = useGetLoggedUserQuery();

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
      dispatch(setSearchText(value));
      dispatch(setSearchTextLoading(false));
    }, 1500);
  };

  useEffect(() => {
    if (searchFromURL !== localSearch) {
      setLocalSearch(searchFromURL);
    }
    if (localSearch) {
      dispatch(setSearchText(localSearch));
    }
    if (!searchFromURL) {
      dispatch(setSearchText(searchFromURL));
    }
  }, [searchFromURL]);

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
          sx={{ color: "black", maxWidth: "180px" }}
        >
          <Link to="/">
            <Box
              component="img"
              src={logo}
              alt="logo"
              sx={{
                width: "200px",
                height: "50px",
                objectFit: "contain",
                m: 0,
                p: 0,
              }}
            />
          </Link>
        </Typography>
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
        <Box
          sx={{
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
            {loggedUserData?.username}
          </Typography>
          <UserProfileButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar