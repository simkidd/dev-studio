import { useMutation, useQueryClient } from "@tanstack/react-query";
import { experiencesApi } from "@/lib/api";
import { IExperience } from "@/interfaces";
import { toast } from "sonner";

export const useCreateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<IExperience>) => {
      const res = await experiencesApi.create(payload);
      return res.data;
    },
    onSuccess: (newExp) => {
      toast.success(`Experience at "${newExp?.company}" added`);
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add experience");
    },
  });
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<IExperience>;
    }) => {
      const res = await experiencesApi.update(id, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Experience updated successfully");
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update experience"
      );
    },
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await experiencesApi.delete(id);
      return res;
    },
    onSuccess: () => {
      toast.success("Experience removed");
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to delete experience"
      );
    },
  });
};
