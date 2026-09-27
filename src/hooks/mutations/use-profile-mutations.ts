import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi, authApi } from "@/lib/api";
import { IProfile } from "@/interfaces";
import { useAuthStore } from "@/stores";
import { toast } from "sonner";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (payload: Partial<IProfile>) => {
      const res = await profileApi.updateProfile(payload);
      return res.data;
    },
    onSuccess: async () => {
      toast.success("Profile saved successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      
      // Refetch /auth/me to instantly update the user name and avatar across the admin header & sidebar
      try {
        const meRes = await authApi.getMe();
        if (meRes?.data) {
          queryClient.setQueryData(["auth", "me"], meRes.data);
          setUser(meRes.data);
        }
      } catch (err) {
        console.error("Failed to refetch auth/me after profile update:", err);
      }
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });
};
