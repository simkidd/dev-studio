import { apiClient } from "../axios";
import { ApiResponse, IProfile } from "@/interfaces";

export const profileApi = {
  getProfile: async (): Promise<ApiResponse<IProfile>> => {
    const { data } = await apiClient.get<ApiResponse<IProfile>>("/profile");
    return data;
  },

  updateProfile: async (payload: Partial<IProfile>): Promise<ApiResponse<IProfile>> => {
    const { data } = await apiClient.put<ApiResponse<IProfile>>(
      "/profile",
      payload
    );
    return data;
  },
};
