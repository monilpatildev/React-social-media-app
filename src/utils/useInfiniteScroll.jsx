
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewPost } from "../api/user/userSlice";

export default function useInfiniteScroll(queryFunction, pageSize) {
  const [pageNumber, setPageNumber] = useState(1);
  const [dataList, setDataList] = useState([]);

  const { data, isFetching, isLoading } = queryFunction({
    pageSize,
    pageNumber,
  });
  const dispatch = useDispatch();

  const newPost = useSelector((state) => state.user.newPost);
  const totalPages = Math.ceil(data?.total / pageSize);

  useEffect(() => {
    if (newPost) {
      setDataList((prevPosts) => {
        if (prevPosts.some((post) => post._id === newPost._id)) {
          return prevPosts;
        }
        return [newPost, ...prevPosts];
      });
      // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      dispatch(setNewPost(null));
    }
  }, [newPost, dispatch]);

  useEffect(() => {
    if (data?.data?.length) {
      setDataList((prevPosts) => {
        const newPosts = data.data.filter(
          (post) => !prevPosts.some((prevPost) => prevPost._id === post._id),
        );
        return [...prevPosts, ...newPosts];
      });
    }
  }, [data]);

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching && pageNumber < totalPages) {
        console.log("Fetching more data...");
        setPageNumber((prevPage) => prevPage + 1);
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [isFetching, pageNumber, totalPages]);

  return { dataList, isFetching, isLoading, data };
}
