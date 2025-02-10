/* eslint-disable react/prop-types */

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@mui/material";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { useEditProfileMutation } from "../api/api";
import { setLoggedUserData } from "../api/user/userSlice";
import CloseIcon from "@mui/icons-material/Close";

const inputFieldArray = [
  { id: "0", type: "text", label: "First Name", name: "firstname" },
  { id: "1", type: "text", label: "Last Name", name: "lastname" },
];

const validationSchema = Yup.object({
  firstname: Yup.string()
    .min(4, "First name must be at least 4 characters")
    .required("Enter first name"),
  lastname: Yup.string()
    .min(4, "Last name must be at least 4 characters")
    .required("Enter last name"),
});

const EditProfile = ({ setEditForm }) => {
  const userData = useSelector((state) => state.user.loggedUserData);
  const dispatch = useDispatch();
  const [editProfile] = useEditProfileMutation();

  const [inputFields, setInputFields] = useState({
    firstname: userData.firstname,
    lastname: userData.lastname,
    account: userData.isPrivate,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    const { name, type, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setInputFields((prevFields) => ({
      ...prevFields,
      [name]: newValue,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const { firstname, lastname, account } = inputFields;

    try {
      const newUser = {
        firstname,
        lastname,
        isPrivate: account,
      };
      await validationSchema.validate(inputFields, { abortEarly: false });
      const response = await editProfile(newUser);
      setEditForm(false);

      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success("User updated!", {
          autoClose: 500,
        });
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
        sx={{
          backgroundColor: "black",
          top: "0px",
          left: "0",
          width: "100%",
          height: "100%",
          opacity: "50%",
          position: "absolute",
        }}
      ></Box>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "150px ",
          position: "absolute",
          top: "-50px",
          left: "31%",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            padding: "10px",
            display: "flex",

            flexDirection: "column",
            alignItems: "center",
            boxShadow: "1px 0px 10px rgba(0,0,0,0.2)",
            borderRadius: "24px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
            <CloseIcon
              sx={{ cursor: "pointer", float: "right" }}
              onClick={() => setEditForm(false)}
            />
          </Box>
          <CardContent sx={{ width: "400px" }}>
            <Typography
              sx={{ color: "text.secondary", fontSize: 38 }}
            >
              Edit Profile
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
            <FormControlLabel
              control={
                <Switch
                  checked={inputFields.account}
                  onChange={handleChange}
                  name="account"
                />
              }
              label="Public Account"
            />
            <CardActions
              sx={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <Button variant="contained" onClick={handleFormSubmit}>
                Save
              </Button>{" "}
              <Button
                variant="contained"
                color="error"
                onClick={() => setEditForm(false)}
              >
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

export default EditProfile;
