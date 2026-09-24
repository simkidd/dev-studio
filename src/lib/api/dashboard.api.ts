import { apiClient } from "../axios";
import { ApiResponse, IDashboardStats } from "@/interfaces";

export const dashboardApi = {
  getStats: async (): Promise<ApiResponse<IDashboardStats>> => {
    const { data } = await apiClient.get<ApiResponse<IDashboardStats>>(
      "/dashboard/stats"
    );
    return data;
  },
};
