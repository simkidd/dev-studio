import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/lib/api";
import { getAccessToken } from "@/lib/cookie.utils";
import { IUser } from "@/interfaces";

export const useCurrentUser = () => {
  const token = getAccessToken();
  return useQuery<IUser>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const res = await authApi.getMe();
      return res.data;
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export const useUser = useCurrentUser;
