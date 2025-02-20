/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Stack } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useDeleteUserMutation } from "../api/user/userApi";
import { setUserLoggedIn } from "../api/auth/authSlice";

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
        onClick={handleCloseForm}
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

      <Stack
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: (theme) => theme.zIndex.drawer + 3,
          width: { xs: "90%", sm: "auto" },
          px: { xs: 2, sm: 0 },
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Card
          variant="outlined"
          sx={{
            p: "20px",
            boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
            borderRadius: "18px",
            width: { xs: "100%", sm: "500px" },
            backgroundColor: "#f0f0f0",
          }}
        >
          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: "10px" }}
            >
              <Typography
                sx={{ color: "text.secondary", fontSize: { xs: 18, sm: 22 } }}
              >
                Are you sure you want to delete your account?
              </Typography>
              <CloseIcon
                sx={{ cursor: "pointer", fontSize: { xs: 28, sm: 38 } }}
                onClick={handleCloseForm}
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent="end"
              alignItems="center"
              spacing={2}
              mt={2}
            >
              <Button
                variant="contained"
                color="default"
                sx={{ boxShadow: "none" }}

                onClick={handleFormSubmit}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCloseForm}
              >
                Cancel
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
      <ToastContainer />
    </>
  );
};

export default DeleteUserForm;
