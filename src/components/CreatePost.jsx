/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormHelperText,
  InputLabel,
  Stack,
  styled,
  Switch,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCreatePostMutation } from "../api/post/postApi";
import { setNewPost, setPostLists, setSearchText } from "../api/post/postSlice";
import { useTheme } from "@mui/material/styles";

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
    .required("Enter Title")
    .max(80, "Title must not be more than 80 characters")
    .min(4, "Title must be at least 4 characters"),
  description: Yup.string()
    .required("Enter Description")
    .min(20, "Description must be at least 20 characters"),
  image: Yup.mixed()
    .required("Select image")
    .test(
      "fileType",
      "Unsupported file format Allowed: JPEG, PNG",
      (value) => value && ["image/jpeg", "image/png"].includes(value.type),
    ),
});

const CreatePost = ({ setShowCreatePost }) => {
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [imagePreview, setImagePreview] = useState(null);
  const newPost = useSelector((state) => state.post.newPost);
  const postLists = useSelector((state) => state.post.postLists);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints?.down("sm"));

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
    mode: "onChange",
  });

  useEffect(() => {
    if (newPost && !postLists.some((post) => post._id === newPost._id)) {
      dispatch(setPostLists([newPost, ...postLists]));
    }
  }, [dispatch, newPost, postLists]);

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
      const response = await createPost(formData).unwrap();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setShowCreatePost(false);
      dispatch(setNewPost(response.data));
      dispatch(setSearchText(""));
    } catch (error) {
      console.log(error);
      toast.error("Failed to create post.");
    }
  };

  return (
    <>
      <Box
        component="div"
        onClick={() => setShowCreatePost(false)}
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

      <Stack
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: (theme) => theme.zIndex.drawer + 3,
          width: { xs: "90%", sm: "520px" },
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Card
          variant="outlined"
          sx={{
            p: "20px",
            boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
            borderRadius: "24px",
            width: "100%",
            backgroundColor: "#f0f0f0",
          }}
        >
          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: "10px" }}
            >
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: isSmallScreen ? 28 : 38,
                }}
              >
                Create Post
              </Typography>
              <CloseIcon
                sx={{ cursor: "pointer", fontSize: { xs: 28, sm: 34 } }}
                onClick={() => setShowCreatePost(false)}
              />
            </Stack>
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
                        "& fieldset": { borderRadius: "14px" },
                      },
                      "& .MuiInputBase-input": { padding: "15px" },
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
                    rows={isSmallScreen ? 3 : 4}
                    placeholder="Enter Description"
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                        borderRadius: "14px",
                        "& fieldset": { borderRadius: "14px" },
                      },
                    }}
                    {...field}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mt: "20px", width: "100%" }}
              >
                <Stack
                  direction="column"
                  spacing={1}
                  alignItems="center"
                  sx={{ mt: "20px" }}
                >
                  <Button
                    component="label"
                    variant="outlined"
                    color="primary"
                    sx={{
                      width: isSmallScreen ? "120px" : "200px",
                      mb: "15px",
                      borderRadius: "15px",
                      p: "1px",
                      height: "35px",
                      px: "10px",
                      fontSize: "12px",
                    }}
                  >
                    {imagePreview ? "Change Image" : "Upload Image"}
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
                    />
                  </Button>
                </Stack>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: isSmallScreen ? "100px" : "150px",
                      objectFit: "cover",
                      borderRadius: "15px",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      mb: "10px",
                      height: isSmallScreen ? "100px" : "150px",
                      width: "100%",
                      border: `2px dashed ${errors.image && !imagePreview ? "red" : "grey"}`,
                      color: `${errors.image && !imagePreview ? "red" : "#9c9b9a"}`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "15px",
                    }}
                  >
                    Preview
                  </Box>
                )}
              </Stack>

              {errors.image && !imagePreview && (
                <FormHelperText
                  sx={{ ml: "15px", fontSize: 14, mb: "10px" }}
                  error
                >
                  {errors.image.message}
                </FormHelperText>
              )}

              {/* Private Post Switch */}
              <Stack direction="row" alignItems="center">
                <Controller
                  name="isPrivate"
                  control={control}
                  render={({ field }) => (
                    <Switch {...field} checked={!!field.value} />
                  )}
                />
                <Typography>Private Post</Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={2}
                sx={{ mt: "10px" }}
              >
                <Button
                  variant="contained"
                  color="default"
                  sx={{ color: "grey", boxShadow: "none" }}
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
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Stack>
      <ToastContainer />
    </>
  );
};

export default CreatePost;
