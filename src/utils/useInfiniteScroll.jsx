import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useInfiniteScroll(queryFunction, pageSize, postLists, setPostLists) {
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.post.searchText);

  const { data, isFetching, isLoading } = queryFunction(
    { pageSize, pageNumber },
    {
      skip: searchText,
    },
  );

  const totalPages = data?.total ? Math.ceil(data.total / pageSize) : 1;
  const throttleTimeout = useRef(null);

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
        }, 300);
      };

      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [isFetching, pageNumber, searchText, totalPages]);

  useEffect(() => {
    if (!searchText) {
      setPageNumber((prev) => prev);
    }
    if (data?.data?.length) {
      const newPosts = data.data.filter(
        (post) => !postLists.some((prevPost) => prevPost._id === post._id),
      );
      if (newPosts.length > 0) {
        dispatch(setPostLists([...postLists, ...newPosts]));
      }
    }
  }, [data, postLists, dispatch, searchText, setPostLists]);

  return { isLoading, data, postLists };
}
