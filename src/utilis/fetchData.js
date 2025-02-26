import axios from "axios";

export const fetchData = async ({ queryKey }) => {
  const [_key, url] = queryKey;
  if (!url) throw new Error("URL is required");
  
  const response = await axios.get(url);
  return response.data;
};