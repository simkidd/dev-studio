import { useQuery } from "@tanstack/react-query";
import { postsApi, PostQueryParams } from "@/lib/api";

export const usePosts = (params?: PostQueryParams) => {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => postsApi.getPosts(params),
  });
};

export const usePostBySlug = (slug: string, enabled = true) => {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const res = await postsApi.getBySlug(slug);
      return res.data;
    },
    enabled: !!slug && enabled,
  });
};

export const usePostById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await postsApi.getById(id);
      return res.data;
    },
    enabled: !!id && enabled,
  });
};
