import { useMutation, useQueryClient } from "@tanstack/react-query";
import { skillsApi } from "@/lib/api";
import { ISkill } from "@/interfaces";
import { toast } from "sonner";

export const useCreateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<ISkill>) => {
      const res = await skillsApi.create(payload);
      return res.data;
    },
    onSuccess: (newSkill) => {
      toast.success(`Skill "${newSkill?.name}" added`);
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create skill");
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<ISkill>;
    }) => {
      const res = await skillsApi.update(id, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Skill updated successfully");
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update skill");
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await skillsApi.delete(id);
      return res;
    },
    onSuccess: () => {
      toast.success("Skill removed");
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete skill");
    },
  });
};
