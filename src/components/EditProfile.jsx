/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  FormControlLabel,
  InputLabel,
  Switch,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEditProfileMutation } from "../api/api";
import { setLoggedUserData } from "../api/user/userSlice";
import CloseIcon from "@mui/icons-material/Close";

const validationSchema = Yup.object({
  firstname: Yup.string()
    .required("Enter first name")
    .min(4, "First name must be at least 4 characters"),
  lastname: Yup.string()
    .required("Enter last name")
    .min(4, "Last name must be at least 4 characters"),
});

const inputFieldArray = [
  { name: "firstname", label: "First Name *", type: "text" },
  { name: "lastname", label: "Last Name *", type: "text" },
];

const EditProfile = ({ setEditForm }) => {
  const userData = useSelector((state) => state.user.loggedUserData);
  const dispatch = useDispatch();
  const [editProfile] = useEditProfileMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstname: userData.firstname,
      lastname: userData.lastname,
      account: userData.isPrivate,
    },
  });

  const onSubmit = async (data) => {
    try {
      const newUser = {
        firstname: data.firstname,
        lastname: data.lastname,
        isPrivate: data.account,
      };
      const response = await editProfile(newUser);
      setEditForm(false);

      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success("User updated!", { autoClose: 500 });
        dispatch(
          setLoggedUserData({
            ...userData,
            ...response.data.data,
          }),
        );
      }
    } catch (err) {
      console.log("Edit profile failed", err);
    }
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
              <Typography sx={{ color: "text.secondary", fontSize: 38 }}>
                Edit Profile
              </Typography>
              <CloseIcon
                sx={{ cursor: "pointer", fontSize: 38 }}
                onClick={() => setEditForm(false)}
              />
            </Box>

            {inputFieldArray.map((field) => (
              <Box key={field.name} sx={{ mb: 2 }}>
                <InputLabel sx={{ mx: "20px", my: "5px" }}>
                  {field.label}
                </InputLabel>
                <TextField
                  fullWidth
                  required
                  {...register(field.name)}
                  type={field.type}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                      borderRadius: "48px",
                      "& fieldset": {
                        borderRadius: "48px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      padding: "10px",
                    },
                  }}
                />
              </Box>
            ))}

            <FormControlLabel
              control={
                <Switch
                  {...register("account")}
                  onChange={(e) => setValue("account", e.target.checked)}
                />
              }
              label="Public Account"
            />

            <CardActions
              sx={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                Save
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => setEditForm(false)}
              >
                Cancel
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Box>
      <ToastContainer />
    </>
  );
};

export default EditProfile;
