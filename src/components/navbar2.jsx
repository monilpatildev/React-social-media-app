import  { useState, useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Verified } from "@mui/icons-material";
import {
  useGetAllUsersQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetUserProfileQuery,
} from "../redux/apiSlice";
import Navbar from "../components/Navbar";
import Avatar from "react-avatar";

const AllUsers = () => {
  const { data, isLoading, error } = useGetAllUsersQuery({
    pageNumber: 1,
    pageSize: 20,
  });

  const { data: userProfile, refetch: refetchProfile } =
    useGetUserProfileQuery();
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const [followStatus, setFollowStatus] = useState({});

  // useEffect(() => {
  // if (userProfile && data) {
  // const statusMap = {};

  // data?.data?.forEach((user) => {
  // if (
  // userProfile?.data?.following?.some((f) => f.followingId === user._id)
  // ) {
  // statusMap[user._id] = "following";
  // } else if (
  // userProfile?.data?.follower?.some(
  // (f) => f.followerId === user._id && !f.isAccepted
  // )
  // ) {
  // statusMap[user._id] = "requested";
  // } else {
  // statusMap[user._id] = "follow";
  // }
  // });

  // setFollowStatus(statusMap);
  // }
  // }, [data, userProfile]);

  useEffect(() => {
    if (userProfile && data) {
      const statusMap = {};

      data?.data?.forEach((user) => {
        const isFollowing = userProfile?.data?.following?.some(
          (f) => f.followingId === user._id && f.isAccepted,
        );
        const isRequested = userProfile?.data?.follower?.some(
          (f) => f.followerId === user._id && !f.isAccepted,
        );

        if (isFollowing) {
          statusMap[user._id] = "following";
        } else if (isRequested) {
          statusMap[user._id] = "requested";
        } else {
          statusMap[user._id] = "follow";
        }
      });

      setFollowStatus(statusMap);
    }
  }, [data, userProfile]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching users</Typography>;

  const users = data?.data || [];

  const handleFollow = async (id, isPrivate) => {
    if (followStatus[id] !== "follow") return;

    try {
      const response = await followUser({ id });
      if (response?.data?.success) {
        setFollowStatus((prev) => ({
          ...prev,
          [id]: isPrivate ? "requested" : "following",
        }));
        refetchProfile(); // Refresh user profile after follow
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async (id) => {
    if (followStatus[id] !== "following") return;

    try {
      const response = await unfollowUser({ id });
      if (response?.data?.success) {
        setFollowStatus((prev) => ({
          ...prev,
          [id]: "follow",
        }));
        refetchProfile(); // Refresh user profile after unfollow
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="md" sx={{ pt: 10 }}>
        <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
          All Users
        </Typography>

        <Grid container spacing={3}>
          {users.map((user) => {
            const status = followStatus[user._id] || "follow";

            return (
              <Grid item xs={12} sm={6} md={4} key={user._id}>
                <Card
                  elevation={6}
                  sx={{
                    borderRadius: 3,
                    p: 3,
                    textAlign: "center",
                    backgroundColor: "white",
                    transition: "0.3s",
                    "&:hover": { boxShadow: 8 },
                  }}
                >
                  <Avatar
                    name={user.firstname + " " + user.lastname}
                    size="80"
                    round={true}
                    color="#e0e0e0"
                  />

                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {user.firstname} {user.lastname}
                      {user.isVerified && (
                        <Verified sx={{ ml: 1, color: "#1976d2" }} />
                      )}
                    </Typography>
                    <Typography color="textSecondary">{user.email}</Typography>

                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        mt: 2,
                        backgroundColor:
                          status === "follow"
                            ? "primary.main"
                            : status === "requested"
                              ? "warning.main"
                              : "success.main",
                        color: "white",
                        "&:hover": {
                          backgroundColor:
                            status === "follow"
                              ? "primary.dark"
                              : status === "requested"
                                ? "warning.dark"
                                : "success.dark",
                        },
                        borderRadius: "20px",
                        fontWeight: "bold",
                      }}
                      onClick={() =>
                        status === "following"
                          ? handleUnfollow(user._id)
                          : handleFollow(user._id, user.isPrivate)
                      }
                    >
                      {status === "follow"
                        ? "Follow"
                        : status === "requested"
                          ? "Requested"
                          : "Unfollow"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default AllUsers;
