/* eslint-disable react/prop-types */
import { Avatar, Box, Skeleton, Stack, Typography } from "@mui/material";
import { useGetImageQuery, useGetUserQuery } from "../api/api";
import userImage from "../assets/user.svg";
import { useNavigate } from "react-router";

const Post = ({ item }) => {
  const { data: postImage } = useGetImageQuery(item.media_id);
  const { data: user, isLoading: userLoading } = useGetUserQuery(item.userId);

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const fullDate = dateString.created_at.slice(0, 10);
    const splitDate = fullDate.split("-");
    const monthArr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthNumber = Number(splitDate[1]);
    const finalMonth = (splitDate[1] = monthArr[monthNumber - 1]);
    return splitDate[2] + " " + finalMonth + "," + splitDate[0];
  };

  const handleUserProfile = () => {
    navigate(`/user/${item.userId}`);
  };

  return (
    <Box
      sx={{
        padding: "10px",
        borderRadius: "18px",
        backgroundColor: "white",
      }}
    >
      {" "}
      <Box
        sx={{
          pr: 2,
          margin: "5px 10px",
          display: "flex",
          padding: "30px",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "white",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Avatar
            alt="Travis Howard"
            src={userImage}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            sx={{
              cursor: "pointer",
              width: "40px",
              height: "40px",
              border: "1px solid grey",
              padding: "5px",
            }}
          />
        </Stack>
        <Typography
          variant="body2"
          fontSize={34}
          onClick={handleUserProfile}
          sx={{
            cursor: "pointer",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            maxWidth: "600px",
            marginLeft: "10px",
          }}
        >
          {!userLoading ? user.username : ""}
        </Typography>
      </Box>
      {postImage ? (
        <img
          style={{
            width: "100%",
            height: 500,
            objectFit: "contain",
          }}
          alt={item.title}
          src={postImage}
        />
      ) : (
        <>
          <Skeleton variant="rectangular" height={450} sx={{ my: 5 }} />
        </>
      )}
      {item ? (
        <Box sx={{ pr: 2, margin: "10px 35px" }}>
          <Typography
            gutterBottom
            variant="body2"
            fontSize={34}
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              maxWidth: "700px",
            }}
          >
            {item.title}
          </Typography>
          <Typography
            variant="caption"
            fontSize={24}
            sx={{
              display: "block",
              color: "text.secondary",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              maxWidth: "1000px",
              fontStyle: "italic",
            }}
          >
            {item.description}
          </Typography>
          <Typography
            variant="caption"
            fontSize={18}
            sx={{ color: "text.secondary" }}
          >
            {formatDate(item)}
          </Typography>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Post;
