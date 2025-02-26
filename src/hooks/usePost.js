import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const usePost = (url, options = {}) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(url, data);
      return response.data;
    },
    ...options,
  });
};
