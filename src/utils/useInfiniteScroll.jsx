import { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
  const throttleTimeout = useRef(null);
  const { pathname } = useLocation();

  const searchText = useSelector((state) => state.post.searchText);

  const isNavbar = pathname === "/";
  const isSearchUserPage = pathname.includes("/users");

  const queryParams = useMemo(() => {
    const params = { pageSize, pageNumber };
    if (searchText) params.searchText = searchText;
    return params;
  }, [pageSize, pageNumber, searchText]);

  const { data, isFetching, isLoading } = queryFunction(queryParams, {
    skip: isNavbar && searchText,
    refetchOnReconnect: true,
  });

  const totalPages = useMemo(() => {
    return data?.total ? Math.ceil(data.total / pageSize) : 1;
  }, [data, pageSize]);

  useEffect(() => {
    if (!isNavbar || searchText) {
      dispatch(setList([]));
    }
  }, [dispatch, isNavbar, searchText, setList]);

  const onScroll = useCallback(() => {
    if (throttleTimeout.current) return;
    throttleTimeout.current = setTimeout(() => {
      throttleTimeout.current = null;
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching && pageNumber < totalPages) {
        console.log("Fetching more data...");
        setPageNumber((prev) => prev + 1);
      }
    }, 300);
  }, [isFetching, pageNumber, totalPages]);

  useEffect(() => {
    if ((isSearchUserPage && searchText) || !searchText) {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [searchText, isSearchUserPage, onScroll]);

  useEffect(() => {
    if (data?.data?.length) {
      const newItems = data.data.filter(
        (item) => !list.some((existing) => existing._id === item._id),
      );
      if (newItems.length > 0) {
        dispatch(setList([...list, ...newItems]));
      } else {
        const updatedList = list.map((existing) => {
          const newItem = data.data.find((item) => item._id === existing._id);
          return newItem && existing.isFollowing !== newItem.isFollowing
            ? newItem
            : existing;
        });
        if (JSON.stringify(updatedList) !== JSON.stringify(list)) {
          dispatch(setList(updatedList));
        }
      }
    }
  }, [data, list, dispatch, setList]);

  return { isLoading, data, list };
}
