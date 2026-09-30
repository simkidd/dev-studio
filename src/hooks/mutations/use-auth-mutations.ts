import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/stores";
import {
  ILoginCredentials,
  IRegisterCredentials,
  IChangePasswordPayload,
} from "@/interfaces";
import { toast } from "sonner";

export const useRegister = () => {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: IRegisterCredentials) => {
      const res = await authApi.register(credentials);
      return res.data;
    },
    onSuccess: (data) => {
      login(data.user, data.tokens);
      queryClient.setQueryData(["auth", "me"], data.user);
      toast.success("Welcome to DevPortfolio SaaS! Account created successfully.");
      router.push("/onboarding");
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.message ||
        "Registration failed. Please check your information.";
      toast.error(msg);
    },
  });
};

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
