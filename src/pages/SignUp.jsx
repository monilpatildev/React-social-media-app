import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  InputLabel,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignUpUserMutation } from "../api/auth/authApi";

const validationSchema = Yup.object({
  firstname: Yup.string()
    .required("Enter first name")
    .min(4, "First name must be at least 4 characters"),
  lastname: Yup.string()
    .required("Enter last name")
    .min(4, "Last name must be at least 4 characters"),
  username: Yup.string()
    .required("Enter username")
    .min(6, "Username must be at least 6 characters"),
  email: Yup.string().required("Enter email").email("Enter valid email"),
  password: Yup.string()
    .required("Enter password")
    .min(8, "Password should be more than 8 characters"),
  confirmpassword: Yup.string()
    .required("Enter confirm password")
    .oneOf(
      [Yup.ref("password"), null],
      "Password and Confirm Password don't match",
    ),
});

const inputFieldArray = [
  { name: "firstname", label: "First Name *", type: "text" },
  { name: "lastname", label: "Last Name *", type: "text" },
  { name: "username", label: "Username *", type: "text" },
  { name: "email", label: "Email *", type: "email" },
  { name: "password", label: "Password *", type: "password" },
  {
    name: "confirmpassword",
    label: "Confirm Password *",
    type: "password",
  },
];
export default function SignUp() {
  const navigate = useNavigate();
  const [signUpUser] = useSignUpUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const { firstname, lastname, username, email, password } = data;
      const newUser = { firstname, lastname, username, email, password };

      const response = await signUpUser(newUser);
      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success("Sign up successfully!", {
          autoClose: 500,
          onClose: () => navigate("/signin"),
        });
      }
    } catch (err) {
      console.log("Sign-up failed", err);
    }
  };



  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f0f2f5",
          padding: "20px",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            maxWidth: 900,
            borderRadius: "48px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            overflow: "hidden",
            backgroundImage:
              "linear-gradient(-120deg,rgba(255, 255, 255,0.3),rgba(245, 245, 174,0.3))",
          }}
        >
          <CardContent sx={{ width: { md: 400 }, p: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
              Sign Up
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              {inputFieldArray.map((field) => (
                <Box key={field.name} sx={{ mb: 2 }}>
                  <InputLabel shrink sx={{ mx: "20px" }}>
                    {field.label}
                  </InputLabel>
                  <TextField
                    fullWidth
                    {...register(field.name)}
                    type={field.type}
                    error={!!errors[field.name]}
                    helperText={errors[field.name]?.message}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                        borderRadius: "48px",
                        "& fieldset": { borderRadius: "48px" },
                      },
                      "& .MuiInputBase-input": { padding: "10px" },
                    }}
                  />
                </Box>
              ))}

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  py: 1.5,
                  mt: 2,
                  borderRadius: "48px",
                  backgroundColor: "#FFCA28",
                  color: "black",
                }}
              >
                Sign Up
              </Button>
            </form>

            <CardActions sx={{ justifyContent: "center", mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  style={{
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "#1976d2",
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </CardActions>
          </CardContent>

          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 4,
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="logo"
              sx={{
                width: { xs: 250, md: 350 },
                height: { xs: 250, md: 350 },
                objectFit: "contain",
              }}
            />
          </CardContent>
        </Card>
      </Box>
      <ToastContainer />
    </>
  );
}
