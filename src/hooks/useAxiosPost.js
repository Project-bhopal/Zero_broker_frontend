import { ApiRequest } from "@/axios/apiRequest";
import { useMutation } from "@tanstack/react-query";
const api_url = process.env.NEXT_PUBLIC_API_BASE_URL;


export const useAxiosPost = (url, options = {}) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await ApiRequest( `${api_url}${url}`, data);
      return response.data;
    },
    ...options,
  });
};
