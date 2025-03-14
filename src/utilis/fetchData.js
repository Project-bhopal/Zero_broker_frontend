import { ApiFetchRequest } from "@/axios/apiRequest";
import api from "@/axios/axios.interceptor";
import axios from "axios";

export const fetchData = async ({ queryKey }) => {
  
  const [_key, url] = queryKey;
  if (!url) throw new Error("URL is required");
  
  const response = await ApiFetchRequest(url);
  return response.data;
};