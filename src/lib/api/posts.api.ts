import { apiClient } from "../axios";
import { ApiResponse, IPost } from "@/interfaces";

export interface PostQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  tag?: string;
  search?: string;
}

export const postsApi = {
  getPosts: async (params?: PostQueryParams): Promise<ApiResponse<IPost[]>> => {
    const { data } = await apiClient.get<ApiResponse<IPost[]>>("/posts", {
      params,
    });
    return data;
  },

  getBySlug: async (slug: string): Promise<ApiResponse<IPost>> => {
    const { data } = await apiClient.get<ApiResponse<IPost>>(`/posts/${slug}`);
    return data;
  },

  create: async (payload: Partial<IPost>): Promise<ApiResponse<IPost>> => {
    const { data } = await apiClient.post<ApiResponse<IPost>>("/posts", payload);
    return data;
  },

  update: async (id: string, payload: Partial<IPost>): Promise<ApiResponse<IPost>> => {
    const { data } = await apiClient.put<ApiResponse<IPost>>(
      `/posts/${id}`,
      payload
    );
    return data;
  },

  like: async (id: string): Promise<ApiResponse<{ likesCount: number }>> => {
    const { data } = await apiClient.post<ApiResponse<{ likesCount: number }>>(
      `/posts/${id}/like`
    );
    return data;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const { data } = await apiClient.delete<ApiResponse<null>>(`/posts/${id}`);
    return data;
  },
};
