import CreatePost from "@components/CreatePost";
import PostList from "@components/PostList";
import Sidebar from "@components/Sidebar";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Home = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  
  useEffect(() => {
    document.body.style.overflow = showCreatePost ? "hidden" : "auto";
  }, [showCreatePost]);

  return (
    <>
      <PostList />

      <Sidebar
        setShowCreatePost={setShowCreatePost}
        showCreatePost={showCreatePost}
      ></Sidebar>

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
