/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, InputLabel } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import logo from "../assets/logo.jpg";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoggedIn } from "../api/auth/authSlice";
import { useSignInUserMutation } from "../api/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

const validationSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Enter email"),
  password: Yup.string()
    .min(8, "Password should be at least 8 characters")
    .required("Enter password"),
});

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signInUser] = useSignInUserMutation();
  const userLoggedIn = useSelector((state) => state.auth.userLoggedIn);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn, navigate]);

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
            navigate("/");
          },
        });
      }
    } catch (err) {
      console.error("Sign-in failed", err);
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
              Sign In
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              {[
                { name: "email", label: "Email", type: "email" },
                { name: "password", label: "Password", type: "password" },
              ].map((field) => (
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
                Sign In
              </Button>
            </form>

            <CardActions sx={{ justifyContent: "center", mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{" "}
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
                mixBlendMode: "multiply",
              }}
            />
          </CardContent>
        </Card>
      </Box>
      <ToastContainer />
    </>
  );
}
