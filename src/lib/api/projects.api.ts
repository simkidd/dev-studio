import { apiClient } from "../axios";
import {
  ApiResponse,
  IProject,
  ProjectCategory,
} from "@/interfaces";

export interface ProjectQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
  status?: string;
  search?: string;
  sort?: string;
}

export const projectsApi = {
  getProjects: async (params?: ProjectQueryParams): Promise<ApiResponse<IProject[]>> => {
    const { data } = await apiClient.get<ApiResponse<IProject[]>>("/projects", {
      params,
    });
    return data;
  },

  getAllAdmin: async (params?: ProjectQueryParams): Promise<ApiResponse<IProject[]>> => {
    const { data } = await apiClient.get<ApiResponse<IProject[]>>("/projects/admin/all", {
      params,
    });
    return data;
  },

  getBySlug: async (slug: string): Promise<ApiResponse<IProject>> => {
    const { data } = await apiClient.get<ApiResponse<IProject>>(
      `/projects/slug/${slug}`
    );
    return data;
  },

  getById: async (id: string): Promise<ApiResponse<IProject>> => {
    const { data } = await apiClient.get<ApiResponse<IProject>>(
      `/projects/${id}`
    );
    return data;
  },

  create: async (payload: FormData): Promise<ApiResponse<IProject>> => {
    const { data } = await apiClient.post<ApiResponse<IProject>>(
      "/projects",
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  },

  update: async (
    id: string,
    payload: FormData
  ): Promise<ApiResponse<IProject>> => {
    const { data } = await apiClient.put<ApiResponse<IProject>>(
      `/projects/${id}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  },



  toggleFeatured: async (id: string): Promise<ApiResponse<IProject>> => {
    const { data } = await apiClient.patch<ApiResponse<IProject>>(
      `/projects/${id}/toggle-featured`
    );
    return data;
  },

  togglePublished: async (id: string): Promise<ApiResponse<IProject>> => {
    const { data } = await apiClient.patch<ApiResponse<IProject>>(
      `/projects/${id}/toggle-published`
    );
    return data;
  },


  reorder: async (orders: { id: string; order: number }[]): Promise<ApiResponse<null>> => {
    const { data } = await apiClient.put<ApiResponse<null>>(
      "/projects/reorder",
      { orders }
    );
    return data;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const { data } = await apiClient.delete<ApiResponse<null>>(`/projects/${id}`);
    return data;
  },

  deleteGalleryImage: async (
    id: string,
    publicId: string
  ): Promise<ApiResponse<IProject>> => {
    const { data } = await apiClient.delete<ApiResponse<IProject>>(
      `/projects/${id}/gallery`,
      {
        data: { publicId },
      }
    );
    return data;
  },
};



