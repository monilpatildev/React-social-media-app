/* eslint-disable react/prop-types */

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useDeleteUserMutation } from "../api/api";
import Cookies from "js-cookie";
import { setUserLoggedIn } from "../api/auth/authSlice";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

const DeleteUserForm = ({ setDeleteUserForm }) => {
  const [deleteUser] = useDeleteUserMutation();
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    toast.success("Account deleted successfully!", {
      autoClose: 500,
      onClose: () => {
        dispatch(setUserLoggedIn(false));
        Cookies.remove("token");
        deleteUser();
      },
    });
  };

  const handleCloseForm = () => {
    setDeleteUserForm(false);
  };
  return (
    <>
      <Box
        component="div"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: (theme) => theme.zIndex.drawer + 2,
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: (theme) => theme.zIndex.drawer + 3,
        }}
      >
        <Card
          variant="outlined"
          sx={{
            padding: "20px",
            boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
            borderRadius: "24px",
            width: "500px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <Typography sx={{ color: "text.secondary", fontSize: 22 }}>
                Are you sure to delete your account ?
              </Typography>
              <CloseIcon
                sx={{ cursor: "pointer", fontSize: 38 }}
                onClick={handleCloseForm}
              />
            </Box>

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
