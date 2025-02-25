/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  FormControlLabel,
  InputLabel,
  Switch,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useEditProfileMutation } from "../api/user/userApi";
import { setLoggedUserData } from "../api/user/userSlice";

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
  const loggedUserData = useSelector((state) => state.user.loggedUserData);
  const dispatch = useDispatch();
  const [editProfile] = useEditProfileMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstname: loggedUserData.firstname,
      lastname: loggedUserData.lastname,
      account: loggedUserData.isPrivate,
    },
    mode: "onChange",
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
            ...loggedUserData,
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
        onClick={() => setEditForm(false)}
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
          transform: "translate(-55%, -50%)",
          zIndex: (theme) => theme.zIndex.drawer + 3,
          width: { xs: "85%", sm: "500px" },
          mx: 2,
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
            width: "100%",
            backgroundColor: "#f0f0f0",
          }}
        >
          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: "10px" }}
            >
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: 24, sm: 38 },
                }}
              >
                Edit Profile
              </Typography>
              <CloseIcon
                sx={{
                  cursor: "pointer",
                  fontSize: { xs: 24, sm: 38 },
                }}
                onClick={() => setEditForm(false)}
              />
            </Stack>
            <Stack spacing={2} mb={2}>
              {inputFieldArray.map((field) => (
                <Stack key={field.name} spacing={1} sx={{ mx: "20px" }}>
                  <InputLabel sx={{ my: "5px" }}>{field.label}</InputLabel>
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
                </Stack>
              ))}
            </Stack>
            <FormControlLabel
              sx={{ mb: "10px" }}
              control={
                <Switch
                  {...register("account")}
                  checked={watch("account")}
                  onChange={(e) => setValue("account", e.target.checked)}
                />
              }
              label="Private Account"
            />
            <Stack direction="row" justifyContent="end" spacing={2}>
              <Button
                variant="contained"
                color="default"
                sx={{ color: "grey", boxShadow: "none" }}
                onClick={() => setEditForm(false)}
              >
                Cancel
              </Button>{" "}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
};

export default EditProfile;
