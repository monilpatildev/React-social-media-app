import Navbar from "@components/Navbar";
import PostList from "@components/PostList";

import { setLoggedUserData } from "../api/user/userSlice";
import { useDispatch } from "react-redux";
import { AuthContext } from "@context/AuthContext";
import { useContext, useEffect } from "react";
import { useGetUserQuery } from "../api/api";

const Home = () => {
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { data, isFetching } = useGetUserQuery(token, {
    skip: !token,
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(setLoggedUserData(data.data));
    }
  }, [dispatch, data]);

  return (
    <div>
      <Navbar />
      {isFetching && <h1>Fetching...</h1>}
      <PostList style={{ marginTop: "300px", transform: "scale(1.5)" }} />
    </div>
  );
};

export default Home;
