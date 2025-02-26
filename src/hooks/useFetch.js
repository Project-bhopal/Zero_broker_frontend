import { fetchData } from "@/utilis/fetchData";
import { useQuery } from "@tanstack/react-query";

export const useFetch = (url, options = {}) => {
  return useQuery({
    queryKey: ["data", url],
    queryFn: fetchData,
    ...options, // Allows passing additional options like `enabled`, `staleTime`, etc.
  });
};
