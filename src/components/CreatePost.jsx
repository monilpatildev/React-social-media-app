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
  styled,
  Switch,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import { useCreatePostMutation } from "../api/api";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const validationSchema = Yup.object({
  title: Yup.string()
    .min(4, "Title must be at least 4 characters")
    .required("Enter Title"),
  description: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .required("Enter Description"),
  image: Yup.mixed()
    .required("Select image")
    .test(
      "fileType",
      "Unsupported file format. Allowed: JPEG, PNG, GIF",
      (value) => value && ["image/jpeg", "image/png"].includes(value.type),
    ),
});

const CreatePost = ({ setShowCreatePost }) => {
  const [inputFields, setInputFields] = useState({
    title: "",
    description: "",
    image: null,
    isPrivate: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createPost, { isLoading }] = useCreatePostMutation();
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

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setInputFields((prevFields) => ({
        ...prevFields,
        image: e.target.files[0],
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    setInputFields((prevFields) => ({
      ...prevFields,
      isPrivate: e.target.checked, // Update isPrivate value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      await validationSchema.validate(inputFields, { abortEarly: false });

      const formData = new FormData();
      formData.append("title", inputFields.title);
      formData.append("description", inputFields.description);
      formData.append("isPrivate", String(inputFields.isPrivate));

      if (inputFields.image) {
        formData.append("image", inputFields.image);
      }

      console.log("FormData Entries:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await createPost(formData).unwrap();
      toast.success("Post created successfully!", {
        autoClose: 800,
      });
      navigate("/");
      console.log("Server Response:", response);
      setShowCreatePost(false);
    } catch (err) {
      if (err.inner) {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Error submitting form:", err);
        toast.error("Failed to create post.", {
          autoClose: 800,
        });
      }
    }
  };

  return (
    <div>
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
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
          zIndex: 20,
        }}
      >
        <Card
          variant="outlined"
          sx={{
            padding: "20px",
            boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
            borderRadius: "24px",
            width: "400px",
            backgroundColor: "white",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <CloseIcon
              sx={{ cursor: "pointer" }}
              onClick={() => setShowCreatePost(false)}
            />
          </Box>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: "0px" }}
          >
            <Typography
              gutterBottom
              sx={{
                color: "text.secondary",
                fontSize: 24,
                textAlign: "center",
              }}
            >
              Create Post
            </Typography>
            <TextField
              required
              variant="filled"
              type="text"
              label="Title"
              sx={{ width: "100%", marginBottom: "15px" }}
              value={inputFields.title}
              name="title"
              onChange={handleChange}
              error={!!errors.title}
            />
            {errors.title && (
              <FormHelperText error>{errors.title}</FormHelperText>
            )}
            <TextField
              required
              variant="filled"
              multiline
              minRows={4}
              label="Description"
              sx={{ width: "100%", marginBottom: "15px" }}
              value={inputFields.description}
              name="description"
              onChange={handleChange}
              error={!!errors.description}
            />{" "}
            {errors.description && (
              <FormHelperText error>{errors.description}</FormHelperText>
            )}
            <Button
              component="label"
              variant="outlined"
              color="primary"
              sx={{ width: "100%", marginBottom: "15px" }}
            >
              Upload Post Image
              <VisuallyHiddenInput
                type="file"
                name="image"
                onChange={handleFileChange}
              />
            </Button>
            {errors.image && (
              <FormHelperText error>{errors.image}</FormHelperText>
            )}
            <FormControlLabel
              control={
                <Switch
                  checked={inputFields.isPrivate}
                  onChange={handleCheckboxChange}
                  name="isc"
                />
              }
              label="Private Post"
            />
            <CardActions
              sx={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleFormSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Posting..." : "Post"}
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => setShowCreatePost(false)}
              >
                Cancel
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default CreatePost;
