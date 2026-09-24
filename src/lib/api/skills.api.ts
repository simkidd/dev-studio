import { apiClient } from "../axios";
import { ApiResponse, ISkill, SkillCategory } from "@/interfaces";

export interface ISkillsByCategory {
  category: SkillCategory;
  skills: ISkill[];
}

export const skillsApi = {
  getSkills: async (category?: string): Promise<ApiResponse<ISkill[]>> => {
    const { data } = await apiClient.get<ApiResponse<ISkill[]>>("/skills", {
      params: category ? { category } : undefined,
    });
    return data;
  },

  getSkillsGrouped: async (): Promise<ApiResponse<ISkillsByCategory[]>> => {
    const { data } = await apiClient.get<ApiResponse<ISkillsByCategory[]>>(
      "/skills/grouped"
    );
    return data;
  },

  create: async (payload: Partial<ISkill>): Promise<ApiResponse<ISkill>> => {
    const { data } = await apiClient.post<ApiResponse<ISkill>>("/skills", payload);
    return data;
  },

  update: async (id: string, payload: Partial<ISkill>): Promise<ApiResponse<ISkill>> => {
    const { data } = await apiClient.put<ApiResponse<ISkill>>(
      `/skills/${id}`,
      payload
    );
    return data;
  },

  reorder: async (items: { id: string; order: number }[]): Promise<ApiResponse<null>> => {
    const { data } = await apiClient.put<ApiResponse<null>>("/skills/reorder", {
      items,
    });
    return data;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const { data } = await apiClient.delete<ApiResponse<null>>(`/skills/${id}`);
    return data;
  },
};
