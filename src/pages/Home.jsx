import Navbar from "@components/Navbar";
import PostList from "@components/PostList";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <PostList sx={{ mt: "300px", scale: "1.5" }} />
    </div>
  );
};

export default Home;
