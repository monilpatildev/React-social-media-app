/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  InputLabel,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { toast } from "react-toastify";
import * as Yup from "yup";
import logo from "../assets/logo.png";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignInUserMutation } from "../api/auth/authApi";
import { setUserLoggedIn } from "../api/auth/authSlice";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFCA28",
    },
  },
  typography: {
    h4: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    body2: {
      fontSize: "1rem",
    },
  },
});

const validationSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Enter email"),
  password: Yup.string()
    .min(8, "Password should be at least 8 characters")
    .required("Enter password"),
});

const inputFieldArray = [
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
];

export default function SignIn() {
  const dispatch = useDispatch();
  const [signInUser] = useSignInUserMutation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await signInUser(data);
      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success("Sign in successfully!", {
          autoClose: 500,
          onClose: () => {
            Cookies.set("token", response.data.data.token, { expires: 7 });
            dispatch(setUserLoggedIn(true));
          },
        });
      }
    } catch (err) {
      console.error("Sign-in failed", err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
            flexDirection: isSmallScreen ? "column" : "row",
            maxWidth: 900,
            borderRadius: "24px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            overflow: "hidden",
            backgroundImage:
              "linear-gradient(-120deg,rgba(255, 255, 255,0.3),rgba(245, 245, 174,0.3))",
          }}
        >
          <CardContent sx={{ width: isSmallScreen ? "100%" : 400, p: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
              Sign In
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
                        borderRadius: "24px",
                        "& fieldset": { borderRadius: "24px" },
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
                disabled={isSubmitting}
                sx={{
                  py: 1.5,
                  mt: 2,
                  borderRadius: "24px",
                  backgroundColor: "#FFCA28",
                  color: "black",
                }}
              >
                Sign In
              </Button>
            </form>

            <CardActions sx={{ justifyContent: "center", mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account? {" "}
                <Link
                  to="/signup"
                  style={{
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "#1976d2",
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </CardActions>
          </CardContent>

          {!isSmallScreen && (
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
                  width: { xs: 200, md: 350 },
                  height: { xs: 200, md: 350 },
                  objectFit: "contain",
                }}
              />
            </CardContent>
          )}
        </Card>
      </Box>

    </ThemeProvider>
  );
} 
