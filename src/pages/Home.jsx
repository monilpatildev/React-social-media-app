import Navbar from "@components/Navbar";
import PostList from "@components/PostList";



const Home = () => {


  return (
    <div >
      <Navbar />
      <PostList style={{ marginTop: "300px", transform: "scale(1.5)" }} />
    </div>
  );
};

export default Home;
