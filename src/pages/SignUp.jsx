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

import { useSignUpUserMutation } from "../features/auth/authApi";

export default function SignUp() {
  const [inputFields, setInputFields] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [signUpUser] = useSignUpUserMutation();

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
    if (!inputValues.firstname) {
      errors.firstname = "enter first name";
    } else if (inputValues.firstname.trim().length < 4) {
      errors.firstname = "first name must be at least 4 characters long.";
    }
    if (!inputValues.lastname) {
      errors.lastname = "enter last name";
    } else if (inputValues.lastname.trim().length < 4) {
      errors.lastname = "last name must be at least 4 characters long.";
    }

    if (!inputValues.username) {
      errors.username = "enter username";
    } else if (inputValues.username.trim().length < 6) {
      errors.username = "username must be at least 6  characters long.";
    }

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
    } else if (inputValues.password.trim().length < 8) {
      errors.password = "password should be more than 8 characters";
    }
    console.log("errors in validation", errors);

    return errors;
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, username, email, password } = inputFields;
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

    const newUser = {
      firstname,
      lastname,
      username,
      email,
      password,
    };
    // console.log(newUser);
    const response = await signUpUser(newUser);

    console.log(response);

    // const updatedUserData = [...storedUserData, newUser];

    toast.success("Sign up successfully!", {
      autoClose: 500,
      onClose: () => navigate("/signin"),
    });
  };
  const inputFieldArray = [
    {
      id: "0",
      type: "text",
      helperText: errors.firstname,
      label: "First Name",
      name: "firstname",
      value: inputFields.firstname,
    },
    {
      id: "1",
      type: "text",
      helperText: errors.lastname,
      label: "Last Name",
      name: "lastname",
      value: inputFields.lastname,
    },
    {
      id: "2",
      type: "text",
      helperText: errors.username,
      label: "Username",
      name: "username",
      value: inputFields.username,
    },
    {
      id: "3",
      type: "email",
      helperText: errors.email,
      name: "email",
      label: "Email",
      value: inputFields.email,
    },
    {
      id: "4",
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
              Sign Up
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
                    sx={{ width: "100%" }}
                    value={field.value}
                    name={field.name}
                    onChange={handleChange}
                  />
                  <FormHelperText error>{field.helperText}</FormHelperText>
                </Typography>
              );
            })}
            <Button variant="outlined" onClick={handleFormSubmit}>
              Sign Up
            </Button>
          </CardContent>
          <CardActions>
            <p>Don't have any account? </p>
            <Link to={"/signin"}>
              <u>Sing In</u>
            </Link>
          </CardActions>
        </Card>
      </Box>
      <ToastContainer />
    </>
  );
}
