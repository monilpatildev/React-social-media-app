import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormHelperText,
  InputLabel,
  styled,
  Switch,
} from "@mui/material";
import { useCreatePostMutation } from "../api/api";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

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
      "Unsupported file format. Allowed: JPEG, PNG",
      (value) => value && ["image/jpeg", "image/png"].includes(value.type),
    ),
});

const CreatePost = ({ setShowCreatePost }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      description: "",
      image: null,
      isPrivate: false,
    },
  });
  const [createPost, { isLoading }] = useCreatePostMutation();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("isPrivate", data.isPrivate);
      formData.append("image", data.image);
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      await createPost(formData).unwrap();
      toast.success("Post created successfully!", { autoClose: 800 });
      navigate("/");
      setShowCreatePost(false);
    } catch (error) {
      console.log(error);

      toast.error(`Failed to create post.${error}`);
    }
  };

  return (
    <>
      <Box
        component="div"
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: (theme) => theme.zIndex.drawer + 3,
        }}
      >
        <Card
          variant="outlined"
          sx={{
            padding: "20px",
            boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
            borderRadius: "24px",
            width: "600px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                gutterBottom
                sx={{
                  fontSize: 28,
                  textAlign: "center",
                }}
              >
                Create Post
              </Typography>
              <CloseIcon
                sx={{ cursor: "pointer", fontSize: 34 }}
                onClick={() => setShowCreatePost(false)}
              />
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <InputLabel sx={{ m: "10px" }}>Title *</InputLabel>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="Enter Title"
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                        borderRadius: "14px",
                        "& fieldset": {
                          borderRadius: "14px",
                        },
                      },
                      "& .MuiInputBase-input": {
                        padding: "15px",
                      },
                    }}
                    {...field}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />

              <InputLabel sx={{ m: "10px" }}>Description *</InputLabel>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    multiline
                    minRows={4}
                    placeholder="Enter Description"
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                        borderRadius: "14px",
                        "& fieldset": {
                          borderRadius: "14px",
                        },
                      },
                      "& .MuiInputBase-input": {},
                    }}
                    {...field}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
              <Box
                sx={{
                  mt: "20px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    mt: "20px",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    component="label"
                    variant="outlined"
                    color="primary"
                    sx={{
                      width: "200px",
                      marginBottom: "15px",
                      borderRadius: "15px",
                      padding: "10px",
                      height: "35px",
                      px: "30px",
                    }}
                  >
                    {imagePreview ? "Change Image" : "Upload  Image"}
                    <Controller
                      name="image"
                      control={control}
                      render={({ field }) => (
                        <>
                          <VisuallyHiddenInput
                            type="file"
                            accept="image/jpeg, image/png"
                            onChange={(e) => {
                              setValue("image", e.target.files[0]);
                              setImagePreview(
                                URL.createObjectURL(e.target.files[0]),
                              );
                            }}
                          />
                        </>
                      )}
                    />{" "}
                  </Button>
                  {errors.image && (
                    <FormHelperText error>
                      {errors.image.message}
                    </FormHelperText>
                  )}
                </Box>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "60%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "15px",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      marginBottom: "10px",
                      height: "150px",
                      width: "100%",
                      border: "2px solid grey",
                      color: "#9c9b9a",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderStyle: "dashed",
                      borderRadius: "15px",
                    }}
                  >
                    Preview
                  </Box>
                )}
              </Box>
              <Controller
                name="isPrivate"
                control={control}
                render={({ field }) => (
                  <Switch {...field} checked={!!field.value} />
                )}
              />
              <Typography>Private Post</Typography>

              <CardActions
                sx={{ display: "flex", justifyContent: "right", gap: "10px" }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setShowCreatePost(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Posting..." : "Post"}
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </Box>
      <ToastContainer />
    </>
  );
};

export default CreatePost;
