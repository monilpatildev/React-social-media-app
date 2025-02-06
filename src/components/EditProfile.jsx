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

const inputFieldArray = [
  { id: "0", type: "text", label: "First Name", name: "firstname" },
  { id: "1", type: "text", label: "Last Name", name: "lastname" },
  { id: "2", type: "text", label: "Username", name: "username" },
  { id: "3", type: "email", label: "Email", name: "email" },
  { id: "4", type: "password", label: "Password", name: "password" },
  {
    id: "5",
    type: "password",
    label: "Confirm Password",
    name: "confirmpassword",
  },
];

const validationSchema = Yup.object({
  firstname: Yup.string()
    .min(4, "First name must be at least 4 characters")
    .required("Enter first name"),
  lastname: Yup.string()
    .min(4, "Last name must be at least 4 characters")
    .required("Enter last name"),
  username: Yup.string()
    .min(6, "Username must be at least 6 characters")
    .required("Enter username"),
  email: Yup.string().email("Enter valid email").required("Enter email"),
  password: Yup.string()
    .min(8, "Password should be more than 8 characters")
    .required("Enter password"),
  confirmpassword: Yup.string()
    .required("Enter Confirm password")
    .oneOf(
      [Yup.ref("password"), null],
      "Password and Confirm Password doesn't match",
    ),
});

const EditProfile = ({ setEditForm }) => {
  const [inputFields, setInputFields] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

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

    const { firstname, lastname, username, email, password } = inputFields;

    try {
      const newUser = {
        firstname,
        lastname,
        username,
        email,
        password,
      };
      await validationSchema.validate(inputFields, { abortEarly: false });
      console.log(newUser);

      // if (response.error) {
      //   toast.error(response.error.data.message);
      // } else {
      //   toast.success("Sign up successfully!", {
      //     autoClose: 500,
      //     onClose: () => navigate("/signin"),
      //   });
      // }
    } catch (err) {
      console.log("Validation failed", err);
    }
  };
  const handleCloseForm =()=>{
    setEditForm(false)
  }
  return (
    <div>
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
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "1px 0px 10px rgba(0,0,0,0.2)",
            borderRadius: "24px",
          }}
        >
          <CardContent sx={{ width: "400px" }}>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 38 }}
            >
              Sign Up
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

            <CardActions>
              <Button variant="contained" onClick={handleFormSubmit}>
                Save
              </Button>{" "}
              <Button variant="contained" onClick={handleCloseForm}>
                Cancel
              </Button>{" "}
            </CardActions>
          </CardContent>
        </Card>

        <ToastContainer />
      </Box>
    </div>
  );
};

export default EditProfile;
