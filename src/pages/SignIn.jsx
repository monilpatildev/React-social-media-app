/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, FormHelperText } from "@mui/material";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import logo from "../assets/logo.jpg";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setAuthToken, setUserLoggedIn } from "../api/auth/authSlice";

import { useSignInUserMutation } from "../api/api";

const validationSchema = Yup.object({
  email: Yup.string().email("Enter valid email").required("Enter email"),
  password: Yup.string()
    .min(8, "Password should be more than 8 characters")
    .required("Enter password"),
});

export default function SignIn() {
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const [signInUser] = useSignInUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSubmitted) {
      validationSchema
        .validate(inputFields, { abortEarly: false })
        .then(() => setErrors({}))
        .catch((err) => {
          const newErrors = {};
          err.inner.forEach((error) => {
            newErrors[error.path] = error.message;
          });
          setErrors(newErrors);
        });
    }
  }, [inputFields, isSubmitted]);

  const handleChange = (e) => {
    setInputFields((prevFields) => ({
      ...prevFields,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const { email, password } = inputFields;
    const loginUserData = {
      email,
      password,
    };

    try {
      await validationSchema.validate(inputFields, { abortEarly: false });
      const response = await signInUser(loginUserData);

      console.log("response", response);

      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        Cookies.set("token", response.data.data.token, { expires: 7 });
        navigate("/");
        dispatch(setAuthToken(response.data.data.token));
        dispatch(setUserLoggedIn(true));
        toast.success("Sign up successfully!", {
          autoClose: 500,
          onClose: () => {},
        });
      }
    } catch (err) {
      console.log("Validation failed", err);
    }
  };
  const inputFieldArray = [
    { id: "0", type: "email", name: "email", label: "Email" },
    { id: "1", type: "password", name: "password", label: "Password" },
  ];

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "80px",
          boxShadow: " 1px 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardContent>
            <img src={logo} alt="logo" width={"350px"} height={"350px"} />
          </CardContent>
          <CardContent sx={{ width: "400px" }}>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 38 }}
            >
              Sign In
            </Typography>
            {inputFieldArray.map((field) => (
              <Typography
                variant="h6"
                component="div"
                marginBottom="15px"
                key={field.id}
              >
                <TextField
                  required
                  variant="filled"
                  type={field.type}
                  label={field.label}
                  sx={{
                    width: "100%",
                  }}
                  value={inputFields[field.name]}
                  name={field.name}
                  onChange={handleChange}
                  error={!!errors[field.name]}
                />
                {errors[field.name] && (
                  <FormHelperText error>{errors[field.name]}</FormHelperText>
                )}
              </Typography>
            ))}
            <Button variant="contained" onClick={handleFormSubmit}>
              Sign In
            </Button>{" "}
            <CardActions>
              <p>Already have an account? </p>
              <Link to="/signup">
                <u>Sign Up</u>
              </Link>
            </CardActions>
          </CardContent>
        </Card>
      </Box>
      <ToastContainer />
    </>
  );
}
