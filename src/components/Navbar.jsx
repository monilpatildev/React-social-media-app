import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import UserProfileButton from "@components/UserProfileButton";
import { Link } from "react-router-dom";
import { AppBar, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
        <Typography variant="h4" component="div" sx={{ color: "black" }}>
          <Link to="/">SocialGram</Link>
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
            width: "50%",
          }}
        >
          <SearchIcon />
        </TextField>
        <UserProfileButton />
      </Toolbar>
    </AppBar>
  );
}
