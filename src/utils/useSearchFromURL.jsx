
import { useSearchParams } from "react-router-dom";

export const useSearchFromURL = () => {
  const [searchParams] = useSearchParams();
  return searchParams.get("search") || "";
};
