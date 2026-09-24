import { apiClient } from "../axios";
import {
  ApiResponse,
  IUser,
  ILoginCredentials,
  IAuthResponse,
  IChangePasswordPayload,
} from "@/interfaces";

export const authApi = {
  login: async (credentials: ILoginCredentials): Promise<ApiResponse<IAuthResponse>> => {
    const { data } = await apiClient.post<ApiResponse<IAuthResponse>>(
      "/auth/login",
      credentials
    );
    return data;
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<{ tokens: { accessToken: string; refreshToken: string } }>> => {
    const { data } = await apiClient.post<ApiResponse<{ tokens: { accessToken: string; refreshToken: string } }>>(
      "/auth/refresh",
      { refreshToken }
    );
    return data;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const { data } = await apiClient.post<ApiResponse<null>>("/auth/logout");
    return data;
  },

  getMe: async (): Promise<ApiResponse<IUser>> => {
    const { data } = await apiClient.get<ApiResponse<IUser>>("/auth/me");
    return data;
  },

  changePassword: async (payload: IChangePasswordPayload): Promise<ApiResponse<null>> => {
    const { data } = await apiClient.post<ApiResponse<null>>(
      "/auth/change-password",
      payload
    );
    return data;
  },
};
