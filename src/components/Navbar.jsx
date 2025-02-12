import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import UserProfileButton from "@components/UserProfileButton";
import { Link } from "react-router-dom";
import { AppBar, Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../assets/logo.png";

export default function Navbar() {
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
                m:0,
                p:0
              }}
            />
          </Link>
        </Typography>
        <TextField
          required
          type="search"
          placeholder="Search..."
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
            width: "40%",
          }}
        >
          <SearchIcon />
        </TextField>
        <UserProfileButton />
      </Toolbar>
    </AppBar>
  );
}
