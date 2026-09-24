import { useQuery } from "@tanstack/react-query";
import { profileApi } from "@/lib/api";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await profileApi.getProfile();
      return res.data;
    },
  });
};
