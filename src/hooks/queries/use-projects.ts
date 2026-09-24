import { useQuery } from "@tanstack/react-query";
import { projectsApi, ProjectQueryParams } from "@/lib/api";

export const useProjects = (params?: ProjectQueryParams) => {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => projectsApi.getProjects(params),
  });
};

export const useAdminProjects = (params?: ProjectQueryParams) => {
  return useQuery({
    queryKey: ["projects", "admin", params],
    queryFn: () => projectsApi.getAllAdmin(params),
  });
};

export const useProjectBySlug = (slug: string, enabled = true) => {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      const res = await projectsApi.getBySlug(slug);
      return res.data;
    },
    enabled: !!slug && enabled,
  });
};

export const useProjectById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["project", "id", id],
    queryFn: async () => {
      const res = await projectsApi.getById(id);
      return res.data;
    },
    enabled: !!id && enabled,
  });
};
