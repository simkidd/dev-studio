import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "@/lib/api";
import { IProfile } from "@/interfaces";
import { toast } from "sonner";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<IProfile>) => {
      const res = await profileApi.updateProfile(payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile saved successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });
};
