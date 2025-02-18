/* eslint-disable react/prop-types */
import { Box, Skeleton, Stack, Typography } from "@mui/material";

import { useNavigate } from "react-router";
import { useState } from "react";
import UserProfileLogo from "./UserProfileLogo";
import { useGetImageQuery } from "../api/post/postApi";
import { useGetUserQuery } from "../api/user/userApi";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Post = ({ item }) => {
  const [showMore, setShowMore] = useState(false);
  const [showPostImage, setShowPostImage] = useState(false);
  
  const { data: postImage ,} = useGetImageQuery(item.media_id);
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
    <Stack
      sx={{
        borderRadius: "18px",
        backgroundColor: "white",
        p: "30px",
        px: "50px",
      }}
      spacing={2}
    >
      <Stack
        direction="row"
        spacing={4}
        sx={{ backgroundColor: "white" }}
        alignItems={"center"}
      >
        <Box onClick={handleUserProfile}>
          <UserProfileLogo user={user} />
        </Box>
        <Stack
          direction="column"
          spacing={0.25}
          sx={{
            pr: 2,
            m: "5px 10px",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <Typography
            variant="body2"
            fontSize={30}
            onClick={handleUserProfile}
            sx={{
              cursor: "pointer",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              maxWidth: "600px",
              ml: "10px",
            }}
          >
            {!userLoading ? user.username : ""}
          </Typography>
          <Typography
            variant="caption"
            fontSize={14}
            sx={{
              color: "text.secondary",
              maxWidth: "600px",
              ml: "10px",
            }}
          >
            {formatDate(item)}
          </Typography>
        </Stack>
        <BookmarkBorderIcon sx={{ fontSize: "34px" }} />
      </Stack>
      <Typography
        variant="body2"
        fontSize={28}
        sx={{
          textOverflow: !showMore ? "ellipsis" : "",
          whiteSpace: !showMore ? "nowrap" : "",
          overflow: !showMore ? "hidden" : "",
          lineBreak: !item.title.includes(" ") ? "anywhere" : "normal",
          wordBreak: "keep-all",

        }}
      >
        {item.title}
      </Typography>
      <Stack>
        {postImage ? (
          <img
            style={{
              width: "100%",
              height: 600,
              objectFit: !showPostImage ? "cover" : "contain",
              borderRadius: "24px",
            }}
            onClick={() => setShowPostImage(!showPostImage)}
            alt={item.title}
            src={postImage}
          />
        ) : (
          <Skeleton variant="rectangular" height={450} sx={{ my: 5 }} />
        )}
      </Stack>
      <Stack direction="row" alignItems="flex-start" spacing={3}>
        <FavoriteBorderIcon
          sx={{ color: "grey", fontSize: "32px", cursor: "pointer" }}
        />
        <ChatBubbleOutlineIcon
          sx={{ color: "grey", fontSize: "32px", cursor: "pointer" }}
        />
        <SendIcon sx={{ color: "grey", fontSize: "32px", cursor: "pointer" }} />
      </Stack>
      <Box component={"span"} sx={{ mt: "10px", display: "inline" }}>
        <Typography
          variant="caption"
          fontSize={24}
          sx={{
            display: "block",
            color: "text.secondary",
            wordBreak: "keep-all",
            fontStyle: "italic",
            lineBreak: !item.description.includes(" ") ? "anywhere" : "normal",
          }}
        >
          {(!showMore && item.description.length > 80)
            ? item.description.slice(0, 80)
            : item.description}
          {!showMore && item.description.length > 80 && "..."}{" "}
          {item.description.length > 80 && (
            <Box
              component={"span"}
              sx={{
                fontSize: "18px",
                cursor: "pointer",
                "&:hover": {
                  color: "primary.main",
                  textDecoration: "underline",
                },
              }}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "show less" : "more"}
            </Box>
          )}
        </Typography>{" "}
      </Box>
    </Stack>
  );
};

export default Post;
