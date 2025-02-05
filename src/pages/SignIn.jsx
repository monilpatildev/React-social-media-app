/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, FormHelperText } from "@mui/material";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

// import { useSignUpUserMutation } from "src/features/auth/authApi";

export default function SignIn() {
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // const [signUpUser] = useSignUpUserMutation();

  const handleChange = (e) => {
    setInputFields((prevFields) => ({
      ...prevFields,
      [e.target.name]: e.target.value,
    }));
    setErrors((prevErrors) => {
      const fieldErrors = validateValues({
        ...inputFields,
        [e.target.name]: e.target.value,
      });
      return {
        ...prevErrors,
        [e.target.name]: fieldErrors[e.target.name] || "",
      };
    });
  };

  const validateValues = (inputValues) => {
    const errors = {};

    if (!inputValues.email) {
      errors.email = "enter email";
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
        inputValues.email,
      )
    ) {
      errors.email = "enter valid email";
    }

    if (!inputValues.password) {
      errors.password = "enter password";
    } else if (inputValues.password.trim().length < 5) {
      errors.password = "password should be more than 5 characters";
    }
    console.log("errors in validation", errors);

    return errors;
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = inputFields;
    const errors1 = validateValues(inputFields);
    setErrors(errors1);
    console.log("errors", errors);

    if (Object.keys(errors1).length) {
      return;
    }

    // const existingUser = storedUserData.find((user) => user.email === email);
    // if (existingUser) {
    //   toast.error("Email already exists.");
    //   return;
    // }

    const userData = {
      email,
      password,
    };

    // const updatedUserData = [...storedUserData, newUser];

    toast.success("Sign up successfully!", {
      autoClose: 500,
      onClose: () => navigate("/signin"),
    });
  };
  const inputFieldArray = [
    {
      id: "0",
      type: "email",
      helperText: errors.email,
      name: "email",
      label: "Email",
      value: inputFields.email,
    },
    {
      id: "1",
      type: "password",
      helperText: errors.password,
      name: "password",
      label: "Password",
      value: inputFields.password,
    },
  ];

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "80px ",
        }}
      >
        <Card variant="outlined" sx={{ padding: "10px", minWidth: "450px" }}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 38 }}
            >
              Sign In
            </Typography>
            {inputFieldArray?.map((field) => {
              return (
                <Typography
                  variant="h5"
                  component="div"
                  marginBottom="25px"
                  key={field.id}
                >
                  <TextField
                    required
                    type={field.type}
                    color={field.helperText && "error"}
                    label={field.label}
                    sx={{
                      "& .MuiInputBase-input": {
                        border: "2px solid blue",
                        borderRadius: "50px",
                        padding: "10px",
                      },
                      width: "100%",
                    }}
                    value={field.value}
                    name={field.name}
                    onChange={handleChange}
                  />
                  <FormHelperText error>{field.helperText}</FormHelperText>
                </Typography>
              );
            })}
            <Button variant="outlined" onClick={handleFormSubmit}>
              Sign In
            </Button>
          </CardContent>
          <CardActions>
            <p>Don't have any account? </p>
            <Link to={"/signup"}>
              <u>Sing Up</u>
            </Link>
          </CardActions>
        </Card>
      </Box>
      <ToastContainer />
    </>
  );
}
