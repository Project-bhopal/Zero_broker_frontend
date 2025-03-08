import { fetchData } from "@/utilis/fetchData";
import { useQuery } from "@tanstack/react-query";
const api_url = process.env.API_URL;


export const useAxiosFetch = (url, options = {}) => {
  return useQuery({
    queryKey: ["data", `${api_url}${url}`],
    queryFn: fetchData,
    ...options, 
  });
};
