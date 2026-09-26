import { apiClient } from "../axios";
import { ApiResponse, IExperience } from "@/interfaces";

export const experiencesApi = {
  getExperiences: async (type?: string): Promise<ApiResponse<IExperience[]>> => {
    const { data } = await apiClient.get<ApiResponse<IExperience[]>>(
      "/experiences",
      {
        params: type ? { type } : undefined,
      }
    );
    return data;
  },

  create: async (payload: Partial<IExperience>): Promise<ApiResponse<IExperience>> => {
    const { data } = await apiClient.post<ApiResponse<IExperience>>(
      "/experiences",
      payload
    );
    return data;
  },

  update: async (
    id: string,
    payload: Partial<IExperience>
  ): Promise<ApiResponse<IExperience>> => {
    const { data } = await apiClient.put<ApiResponse<IExperience>>(
      `/experiences/${id}`,
      payload
    );
    return data;
  },

  reorder: async (orders: { id: string; order: number }[]): Promise<ApiResponse<null>> => {
    const { data } = await apiClient.put<ApiResponse<null>>(
      "/experiences/reorder",
      { orders }
    );
    return data;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const { data } = await apiClient.delete<ApiResponse<null>>(
      `/experiences/${id}`
    );
    return data;
  },
};
