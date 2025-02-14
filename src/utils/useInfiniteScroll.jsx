import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewPost } from "../api/post/postSlice";

export default function useInfiniteScroll(queryFunction, pageSize) {
  const [pageNumber, setPageNumber] = useState(1);
  const [dataList, setDataList] = useState([]);

  const searchText = useSelector((state) => state.post.searchText);
  const { data, isFetching, isLoading } = queryFunction(
    {
      pageSize,
      pageNumber,
    },
    {
      skip: searchText,
    },
  );
  const dispatch = useDispatch();

  const newPost = useSelector((state) => state.post.newPost);
  const totalPages = Math.ceil(data?.total / pageSize);

  const throttleTimeout = useRef(null);

  useEffect(() => {
    if (newPost) {
      setDataList((prevPosts) => {
        if (prevPosts.some((post) => post._id === newPost._id)) {
          return prevPosts;
        }
        return [newPost, ...prevPosts];
      });
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      dispatch(setNewPost(null));
    }
  }, [newPost, dispatch]);
  useEffect(() => {
    if (!searchText) {
      const onScroll = () => {
        if (throttleTimeout.current) return;

        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null;
          const scrolledToBottom =
            window.innerHeight + window.scrollY + 600 >=
            document.body.offsetHeight;

          if (scrolledToBottom && !isFetching && pageNumber < totalPages) {
            console.log("Fetching more data...");
            setPageNumber((prev) => prev + 1);
          }
        }, 200);
      };

      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [isFetching, pageNumber, totalPages]);

  useEffect(() => {
    if (!searchText) {
      setPageNumber((prev)=> prev)
    }
    if (data?.data?.length) {
      setDataList((prevPosts) => {
        const newPosts = data.data.filter(
          (post) => !prevPosts.some((prevPost) => prevPost._id === post._id),
        );

        return [...prevPosts, ...newPosts];
      });
    }
  }, [data]);

  return { dataList, isLoading, data };
}
