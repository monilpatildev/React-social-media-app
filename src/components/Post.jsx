/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Skeleton,
  Typography,
} from "@mui/material";
import { useGetImageQuery, useGetUserQuery } from "../api/api";
import { useNavigate } from "react-router";
import { useState } from "react";
import UserProfileLogo from "./UserProfileLogo";

const Post = ({ item }) => {
  const [showMore, setShowMore] = useState(false);
  const [showPostImage, setShowPostImage] = useState(false);
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
        borderRadius: "18px",
        backgroundColor: "white",
        display: "flex",
        padding: "30px",
        gap: "10px",
        flexDirection: "column",
        px: "50px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          backgroundColor: "white",
        }}
      >
        <Box sx={{ mt: "15px" }} onClick={handleUserProfile}>
          <UserProfileLogo user={user} />
        </Box>
        <Box
          sx={{
            pr: 2,
            margin: "5px 10px",
            display: "flex",
            alignItems: "start",
            gap: "2px",
            flexDirection: "column",
            justifyContent: "start",
            width: "100%",
          }}
        >
          <Typography
            variant="body2"
            fontSize={38}
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
          <Typography
            variant="caption"
            fontSize={14}
            sx={{
              color: "text.secondary",
              maxWidth: "600px",
              marginLeft: "10px",
            }}
          >
            {formatDate(item)}
          </Typography>
        </Box>
      </Box>
      <Typography
        gutterBottom
        variant="body2"
        fontSize={28}
        sx={{
          textOverflow: `${!showMore ? "ellipsis " : ""}`,
          whiteSpace: `${!showMore ? "nowrap " : ""}`,
          overflow: `${!showMore ? "hidden " : ""}`,
          lineBreak: `${!item.title.includes(" ") && "anywhere"}`,
          maxWidth: "700px",
          mt: "20px",
          width: "100%",
          wordBreak: "keep-all",
        }}
      >
        {item.title}
      </Typography>
      <Box>
        {postImage ? (
          <img
            style={{
              width: "100%",
              height: 600,
              objectFit: `${!showPostImage ? "cover" : "contain"}`,
              borderRadius: "24px",
            }}
            onClick={() => setShowPostImage(!showPostImage)}
            alt={item.title}
            src={postImage}
          />
        ) : (
          <>
            <Skeleton variant="rectangular" height={450} sx={{ my: 5 }} />
          </>
        )}
      </Box>
      <Box
        sx={{
          mt: "10px",
          display: "flex",
          alignItems: "start",
          gap: "2px",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="caption"
          fontSize={24}
          sx={{
            display: "block",
            color: "text.secondary",
            textOverflow: `${!showMore ? "ellipsis " : ""}`,
            whiteSpace: `${!showMore ? "nowrap " : ""}`,
            overflow: `${!showMore ? "hidden " : ""}`,
            wordBreak: "keep-all",
            maxWidth: "1000px",
            fontStyle: "italic",
            lineBreak: `${!item.description.includes(" ") && "anywhere"}`,
          }}
        >
          {item.description}
        </Typography>

        {item.description.length > 80 ? (
          <Button
            variant="contained"
            color="default"
            sx={{ color: "grey", boxShadow: "none", width: "100px", px: "0px" }}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "Show More"}
          </Button>
        ) : (
          ""
        )}
      </Box>{" "}
    </Box>
  );
};

export default Post;
