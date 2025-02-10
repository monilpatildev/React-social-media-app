/* eslint-disable react/prop-types */

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useDeleteUserQuery } from "../api/api";
import Cookies from "js-cookie";
import { setUserLoggedIn } from "../api/auth/authSlice";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const DeleteUserForm = ({ setDeleteUserForm }) => {
  const { data } = useDeleteUserQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = data
      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        Cookies.remove("token");
        toast.success("Log out successfully!", {
          autoClose: 500,
          onClose: () => {
            navigate("/signin");
            dispatch(setUserLoggedIn(false));
          },
        });
      }
    } catch (err) {
      console.log("Edit profile failed", err);
    }
  };
  const handleCloseForm = () => {
    setDeleteUserForm(false);
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: "black",
          top: "0px",
          left: "0",
          width: "100%",
          height: "100%",
          opacity: "50%",
          position: "absolute",
        }}
      ></Box>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "150px ",
          paddingTop: "350px",
          position: "absolute",
          top: "-50px",
          left: "31%",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "1px 0px 10px rgba(0,0,0,0.2)",
            borderRadius: "24px",
          }}
        >
          <CardContent sx={{ width: "400px" }}>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 24 }}
            >
              Are you sure to delete your account ?
            </Typography>

            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={handleFormSubmit}
              >
                Delete
              </Button>{" "}
              <Button variant="contained" onClick={handleCloseForm}>
                Cancel
              </Button>{" "}
            </CardActions>
          </CardContent>
        </Card>
      </Box>
      <ToastContainer />
    </>
  );
};

export default DeleteUserForm;
