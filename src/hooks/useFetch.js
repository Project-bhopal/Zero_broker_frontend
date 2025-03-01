import { fetchData } from "@/utilis/fetchData";
import { useQuery } from "@tanstack/react-query";
const api_url = process.env.API_URL;


export const useFetch = (url, options = {}) => {
  return useQuery({
    queryKey: ["data", `${api_url}${url}`],
    queryFn: fetchData,
    ...options, // Allows passing additional options like `enabled`, `staleTime`, etc.
  });
};
