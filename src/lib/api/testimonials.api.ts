import { apiClient } from "../axios";
import { ApiResponse, ITestimonial } from "@/interfaces";

export const testimonialsApi = {
  getTestimonials: async (featured?: boolean): Promise<ApiResponse<ITestimonial[]>> => {
    const { data } = await apiClient.get<ApiResponse<ITestimonial[]>>(
      "/testimonials",
      {
        params: featured !== undefined ? { featured } : undefined,
      }
    );
    return data;
  },

  create: async (
    payload: Partial<ITestimonial>
  ): Promise<ApiResponse<ITestimonial>> => {
    const { data } = await apiClient.post<ApiResponse<ITestimonial>>(
      "/testimonials",
      payload
    );
    return data;
  },

  update: async (
    id: string,
    payload: Partial<ITestimonial>
  ): Promise<ApiResponse<ITestimonial>> => {
    const { data } = await apiClient.put<ApiResponse<ITestimonial>>(
      `/testimonials/${id}`,
      payload
    );
    return data;
  },

  reorder: async (items: { id: string; order: number }[]): Promise<ApiResponse<null>> => {
    const { data } = await apiClient.put<ApiResponse<null>>(
      "/testimonials/reorder",
      { items }
    );
    return data;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const { data } = await apiClient.delete<ApiResponse<null>>(
      `/testimonials/${id}`
    );
    return data;
  },
};
