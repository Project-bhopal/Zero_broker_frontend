import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const api_url = process.env.NEXT_PUBLIC_API_BASE_URL;


export const usePost = (url, options = {}) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post( `${api_url}${url}`, data, {
        withCredentials : true
      });
      return response.data;
    },
    ...options,
  });
};
