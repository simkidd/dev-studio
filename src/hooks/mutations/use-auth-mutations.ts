import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/stores";
import { ILoginCredentials, IChangePasswordPayload } from "@/interfaces";
import { toast } from "sonner";

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: ILoginCredentials) => {
      const res = await authApi.login(credentials);
      return res.data;
    },
    onSuccess: (data) => {
      login(data.user, data.tokens);
      queryClient.setQueryData(["auth", "me"], data.user);
      toast.success("Welcome back! Logged in successfully.");
      router.push("/admin");
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.message ||
        "Invalid credentials. Please check your email and password.";
      toast.error(msg);
    },
  });
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await logout();
    },
    onSuccess: () => {
      queryClient.clear();
      toast.success("Logged out successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to log out");
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (payload: IChangePasswordPayload) => {
      const res = await authApi.changePassword(payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to change password");
    },
  });
};
