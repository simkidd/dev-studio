import { useQuery } from "@tanstack/react-query";
import { platformApi } from "@/lib/api";

export const usePlatformStats = () => {
  return useQuery({
    queryKey: ["platform", "stats"],
    queryFn: async () => {
      const res = await platformApi.getStats();
      return res.data;
    },
    refetchInterval: 30000,
  });
};

export const usePlatformUsers = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}) => {
  return useQuery({
    queryKey: ["platform", "users", params],
    queryFn: async () => {
      const res = await platformApi.getUsers(params);
      return res.data;
    },
  });
};

export const useReservedSlugs = () => {
  return useQuery({
    queryKey: ["platform", "slugs"],
    queryFn: async () => {
      const res = await platformApi.getReservedSlugs();
      return res.data;
    },
  });
};

export const usePlatformTemplates = () => {
  return useQuery({
    queryKey: ["platform", "templates"],
    queryFn: async () => {
      const res = await platformApi.getTemplates();
      return res.data;
    },
  });
};

export const usePlatformAnnouncements = () => {
  return useQuery({
    queryKey: ["platform", "announcements"],
    queryFn: async () => {
      const res = await platformApi.getAnnouncements();
      return res.data;
    },
  });
};

export const useActiveAnnouncements = () => {
  return useQuery({
    queryKey: ["announcements", "active"],
    queryFn: async () => {
      const res = await platformApi.getActivePublicAnnouncements();
      return res.data;
    },
    refetchInterval: 60000,
  });
};

export const useAuditLogs = (params?: {
  page?: number;
  limit?: number;
  category?: string;
}) => {
  return useQuery({
    queryKey: ["platform", "logs", params],
    queryFn: async () => {
      const res = await platformApi.getAuditLogs(params);
      return res.data;
    },
  });
};
