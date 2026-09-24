import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "@/lib/api";
import { IPost } from "@/interfaces";
import { toast } from "sonner";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<IPost>) => {
      const res = await postsApi.create(payload);
      return res.data;
    },
    onSuccess: (newPost) => {
      toast.success(`Post "${newPost?.title}" created`);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create post");
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<IPost>;
    }) => {
      const res = await postsApi.update(id, payload);
      return res.data;
    },
    onSuccess: (updated) => {
      toast.success("Post updated successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", updated?.slug] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update post");
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await postsApi.delete(id);
      return res;
    },
    onSuccess: () => {
      toast.success("Post deleted");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete post");
    },
  });
};
