import CreatePost from "@components/CreatePost";
import PostList from "@components/PostList";
import Sidebar from "@components/Sidebar";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const loggedUserData = useSelector((state) => state.user.loggedUserData);
  useEffect(() => {
    document.body.style.overflow = showCreatePost ? "hidden" : "auto";
  }, [showCreatePost]);

  return (
    <>
      {loggedUserData ? (
        <>
          <Sidebar
            setShowCreatePost={setShowCreatePost}
            showCreatePost={showCreatePost}
          />
          <PostList />
        </>
      ) : (
        ""
      )}

      {showCreatePost &&
        createPortal(
          <CreatePost
            setShowCreatePost={setShowCreatePost}
            showCreatePost={showCreatePost}
          />,
          document.body,
        )}
    </>
  );
};

export default Home;
