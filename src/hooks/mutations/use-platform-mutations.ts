import { useMutation, useQueryClient } from "@tanstack/react-query";
import { platformApi, ITemplateSettingItem, IAnnouncementItem } from "@/lib/api";
import { useAuthStore } from "@/stores";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      role,
    }: {
      userId: string;
      role: "user" | "admin" | "superadmin";
    }) => {
      const res = await platformApi.updateUserRole(userId, role);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform"] });
      toast.success("User role updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update user role");
    },
  });
};

export const useDeletePlatformUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await platformApi.deleteUser(userId);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform"] });
      toast.success("User and associated tenant records deleted");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete user");
    },
  });
};

export const useImpersonateUser = () => {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await platformApi.impersonateUser(userId);
      return res.data;
    },
    onSuccess: (data) => {
      login(data.user, data.tokens);
      toast.success(`Support Mode: Now logged in as ${data.user.email}`);
      router.push("/admin");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to start impersonation session");
    },
  });
};

// Reserved Slugs Mutations
export const useAddReservedSlug = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ slug, reason }: { slug: string; reason?: string }) => {
      const res = await platformApi.addReservedSlug(slug, reason);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "slugs"] });
      queryClient.invalidateQueries({ queryKey: ["platform", "stats"] });
      toast.success("Keyword added to reserved list");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to reserve slug");
    },
  });
};

export const useDeleteReservedSlug = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await platformApi.deleteReservedSlug(id);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "slugs"] });
      queryClient.invalidateQueries({ queryKey: ["platform", "stats"] });
      toast.success("Reserved slug removed");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to remove reserved slug");
    },
  });
};

// Template Mutations
export const useUpdateTemplateSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      templateId,
      data,
    }: {
      templateId: string;
      data: Partial<ITemplateSettingItem>;
    }) => {
      const res = await platformApi.updateTemplate(templateId, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "templates"] });
      toast.success("Template settings updated");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update template setting");
    },
  });
};

// Announcements Mutations
export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<IAnnouncementItem>) => {
      const res = await platformApi.createAnnouncement(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "announcements"] });
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      toast.success("Platform announcement published");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to publish announcement");
    },
  });
};

export const useUpdateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<IAnnouncementItem>;
    }) => {
      const res = await platformApi.updateAnnouncement(id, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "announcements"] });
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      toast.success("Announcement updated");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update announcement");
    },
  });
};

export const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await platformApi.deleteAnnouncement(id);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform", "announcements"] });
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      toast.success("Announcement deleted");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete announcement");
    },
  });
};
