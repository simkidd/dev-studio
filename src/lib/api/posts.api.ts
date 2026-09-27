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
    const { data } = await apiClient.get<ApiResponse<IPost>>(`/posts/slug/${slug}`);
    return data;
  },

  getById: async (id: string): Promise<ApiResponse<IPost>> => {
    const { data } = await apiClient.get<ApiResponse<IPost>>(`/posts/admin/${id}`);
    return data;
  },

  create: async (payload: FormData | Partial<IPost>): Promise<ApiResponse<IPost>> => {
    const isFormData = payload instanceof FormData;
    const { data } = await apiClient.post<ApiResponse<IPost>>(
      "/posts",
      payload,
      isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : undefined
    );
    return data;
  },

  update: async (
    id: string,
    payload: FormData | Partial<IPost>
  ): Promise<ApiResponse<IPost>> => {
    const isFormData = payload instanceof FormData;
    const { data } = await apiClient.put<ApiResponse<IPost>>(
      `/posts/${id}`,
      payload,
      isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : undefined
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
