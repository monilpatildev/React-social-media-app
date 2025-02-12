import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostCreated } from "../api/user/userSlice";

export default function useInfiniteScroll(queryFunction, pageSize) {
  const [pageNumber, setPageNumber] = useState(1);
  const [dataList, setDataList] = useState([]);

  const { data, isFetching ,isLoading} = queryFunction({ pageSize, pageNumber });
 const dispatch = useDispatch();
    const postCreated = useSelector((state) => state.user.postCreated);

  const totalPages = Math.ceil(data?.total / pageSize);

useEffect(() => {
  if (data?.data?.length) {
    setDataList((prevPosts) => {
      const newPosts = data.data.filter(
        (post) => !prevPosts.some((prevPost) => prevPost._id === post._id),
      );

      if (postCreated) {
           dispatch(setPostCreated(false))
           window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
           setPageNumber(1)
        return [...newPosts, ...prevPosts];
      } else {
        return [...prevPosts, ...newPosts];
      }
    });
  }
}, [data]);

useEffect(() => {
  const onScroll = () => {
    const scrolledToBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;
    if (scrolledToBottom && !isFetching && totalPages >= pageNumber) {
      console.log("Fetching more data...");
      setPageNumber(pageNumber + 1);
    }
  };

  document.addEventListener("scroll", onScroll);

  return function () {
    document.removeEventListener("scroll", onScroll);
  };
}, [isFetching, pageNumber]);

  return { dataList, isFetching, isLoading, data };
}
