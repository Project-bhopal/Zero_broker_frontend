import { fetchData } from "@/utilis/fetchData";
import { useQuery } from "@tanstack/react-query";
const api_url = process.env.NEXT_PUBLIC_API_BASE_URL;


function useAxiosFetch(url) {
  return useQuery({
    queryKey: ["fetchData", url], // Avoid unnecessary cache resets
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Prevent refetching when switching tabs
  });
}

export default useAxiosFetch
