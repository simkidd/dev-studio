import { useQuery } from "@tanstack/react-query";
import { skillsApi } from "@/lib/api";

export const useSkills = (category?: string) => {
  return useQuery({
    queryKey: ["skills", category],
    queryFn: async () => {
      const res = await skillsApi.getSkills(category);
      return res.data || [];
    },
  });
};

export const useSkillsGrouped = () => {
  return useQuery({
    queryKey: ["skills", "grouped"],
    queryFn: async () => {
      const res = await skillsApi.getSkillsGrouped();
      return res.data || [];
    },
  });
};
