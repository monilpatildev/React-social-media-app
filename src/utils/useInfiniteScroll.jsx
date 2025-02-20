/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

export default function useInfiniteScroll(
  queryFunction,
  pageSize,
  list,
  setList,
) {
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.post.searchText);

  const queryParams = { pageSize, pageNumber };
  if (searchText) queryParams.searchText = searchText;
  const location = useLocation();
  const isNavbar = location.pathname === "/";

  const { data, isFetching, isLoading } = queryFunction(queryParams, {
    skip: isNavbar && searchText,
  });

  const totalPages = data?.total ? Math.ceil(data.total / pageSize) : 1;
  const throttleTimeout = useRef(null);

  useEffect(() => {
    if (!isNavbar) {
      dispatch(setList([]));
    }
  }, [searchText, dispatch, setList]);

  useEffect(() => {
    
    if (!searchText) {
      const onScroll = () => {
        if (throttleTimeout.current) return;

        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null;
          const scrolledToBottom =
            window.innerHeight + window.scrollY >=
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
  }, [isFetching, pageNumber, totalPages]);

  useEffect(() => {
    if (!searchText) {
      setPageNumber((prev) => prev);
    }
    if (data?.data?.length) {
      const newItems = data.data.filter(
        (item) => !list.some((existing) => existing._id === item._id),
      );
      if (newItems.length > 0) {
        dispatch(setList([...list, ...newItems]));
      } else {
        let updatedList = [...list];
        data.data.forEach((newItem) => {
          const index = updatedList.findIndex(
            (existing) => existing._id === newItem._id,
          );
          if (
            index !== -1 &&
            updatedList[index].isFollowing !== newItem.isFollowing
          ) {
            updatedList[index] = newItem;
          }
        });
        if (JSON.stringify(updatedList) !== JSON.stringify(list)) {
          dispatch(setList(updatedList));
        }
      }
    }
  }, [data, list, dispatch, setList, searchText]);
  console.log(list);

  return { isLoading, data, list };
}
