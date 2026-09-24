import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "@/lib/api";
import { IProject } from "@/interfaces";
import { toast } from "sonner";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: FormData) => {
      const res = await projectsApi.create(payload);
      return res.data;
    },
    onSuccess: (newProject) => {
      toast.success(`Project "${newProject?.title}" created successfully`);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create project");
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: FormData;
    }) => {
      const res = await projectsApi.update(id, payload);
      return res.data;
    },


    onSuccess: (updatedProject) => {
      toast.success(`Project updated successfully`);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update project");
    },
  });
};

export const useToggleFeaturedProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await projectsApi.toggleFeatured(id);
      return res.data;
    },
    onSuccess: (project) => {
      toast.success(
        `Project marked as ${project?.isFeatured ? "featured" : "standard"}`
      );
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to toggle featured status");
    },
  });
};

export const useTogglePublishedProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await projectsApi.togglePublished(id);
      return res.data;
    },
    onSuccess: (project) => {
      toast.success(
        `Project marked as ${project?.isPublished ? "published" : "draft"}`
      );
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to toggle published status");
    },
  });
};


export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await projectsApi.delete(id);
      return res;
    },
    onSuccess: () => {
      toast.success("Project deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete project");
    },
  });
};

export const useReorderProjects = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orders: { id: string; order: number }[]) => {
      const res = await projectsApi.reorder(orders);
      return res;
    },
    onSuccess: () => {
      toast.success("Project order saved");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to reorder projects");
    },
  });
};

export const useDeleteGalleryImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectId,
      publicId,
    }: {
      projectId: string;
      publicId: string;
    }) => {
      const res = await projectsApi.deleteGalleryImage(projectId, publicId);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Screenshot removed from gallery");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to remove screenshot"
      );
    },
  });
};


