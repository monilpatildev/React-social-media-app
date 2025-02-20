/* eslint-disable react/prop-types */
import {
  Box,
  Skeleton,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router";
import UserProfileLogo from "./UserProfileLogo";
import { useGetImageQuery } from "../api/post/postApi";
import { useGetUserQuery } from "../api/user/userApi";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useState } from "react";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";

const Post = ({ item }) => {
  const [showMore, setShowMore] = useState(false);
  const [showPostImage, setShowPostImage] = useState(false);
  const [saveBtn ,setSaveBtn]= useState(false)

  const { data: postImage } = useGetImageQuery(item.media_id);
  const { data: user, isLoading: userLoading } = useGetUserQuery(item.userId);

  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
    const finalMonth = monthArr[monthNumber - 1];
    return splitDate[2] + " " + finalMonth + ", " + splitDate[0];
  };

  const handleUserProfile = () => {
    navigate(`/user/${item.userId}`);
  };

  return (
    <Stack
      sx={{
        borderRadius: "18px",
        backgroundColor: "white",
        p: isSmallScreen ? "20px" : "30px",
        px: isSmallScreen ? "20px" : "50px",
        mb: isSmallScreen ? "0px" : "20px",
      }}
      spacing={2}
    >
      <Stack
        direction="row"
        spacing={isSmallScreen ? 2 : 4}
        alignItems="center"
        sx={{ backgroundColor: "white" }}
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
            fontSize={isSmallScreen ? 20 : 30}
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
            fontSize={isSmallScreen ? 12 : 14}
            sx={{
              color: "text.secondary",
              maxWidth: "600px",
              ml: "10px",
            }}
          >
            {formatDate(item)}
          </Typography>
        </Stack>
        {!saveBtn ? (
          <BookmarkBorderIcon
            onClick={() => setSaveBtn(!saveBtn)}
            sx={{
              color: "text.secondary",
              fontSize: isSmallScreen ? "28px" : "34px",
              cursor: "pointer",
            }}
          />
        ) : (
          <BookmarkRoundedIcon
            onClick={() => setSaveBtn(!saveBtn)}
            sx={{
              color: "text.secondary",
              fontSize: isSmallScreen ? "28px" : "34px",
              cursor: "pointer",
            }}
          />
        )}
      </Stack>
      <Typography
        variant="body2"
        fontSize={isSmallScreen ? 14 : 28}
        sx={{
          display: "block",
          wordBreak: "keep-all",
          lineBreak: item.title.includes(" ") ? "normal" : "anywhere",
        }}
      >
        {!showMore && item.title.length > 80
          ? item.title.slice(0, 80)
          : item.title}
        {!showMore && item.title.length > 80 && "..."}{" "}
      </Typography>
      <Stack>
        {postImage ? (
          <img
            style={{
              height: isSmallScreen ? 250 : 600,
              objectFit: !showPostImage ? "cover" : "contain",
              borderRadius: "24px",
              width: "inherit",
            }}
            onClick={() => setShowPostImage(!showPostImage)}
            alt={item.title}
            src={postImage}
          />
        ) : (
          <Skeleton
            variant="rectangular"
            height={isSmallScreen ? 250 : 450}
            sx={{ my: 5 }}
          />
        )}
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={isSmallScreen ? 2 : 3}
        justifyContent={"flex-start"}
      >
        <FavoriteBorderIcon
          sx={{
            color: "grey",
            fontSize: isSmallScreen ? "28px" : "32px",
            cursor: "pointer",
          }}
        />
        <ChatBubbleOutlineIcon
          sx={{
            color: "grey",
            fontSize: isSmallScreen ? "28px" : "32px",
            cursor: "pointer",
          }}
        />
        <SendIcon
          sx={{
            color: "grey",
            fontSize: isSmallScreen ? "28px" : "32px",
            cursor: "pointer",
          }}
        />{" "}
        <Typography
          variant="caption"
          fontSize={isSmallScreen ? 14 : 20}
          sx={{
            color: "text.secondary",
          }}
        >
          (Features coming soon...)
        </Typography>
      </Stack>
      <Box component="span" sx={{ mt: "10px" }}>
        <Typography
          variant="caption"
          fontSize={isSmallScreen ? 14 : 24}
          sx={{
            display: "block",
            color: "text.secondary",
            wordBreak: "keep-all",
            fontStyle: "italic",
            lineBreak: item.description.includes(" ") ? "normal" : "anywhere",
            width: "inherit",
          }}
        >
          {!showMore && item.description.length > 80
            ? item.description.slice(0, 80)
            : item.description}
          {!showMore && item.description.length > 80 && "..."}{" "}
          {item.description.length > 80 && (
            <Box
              component="span"
              sx={{
                fontSize: isSmallScreen ? "16px" : "18px",
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
        </Typography>
      </Box>
    </Stack>
  );
};

export default Post;
