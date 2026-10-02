import { apiClient } from "../axios";
import { ApiResponse } from "@/interfaces";

export interface IPlatformStats {
  metrics: {
    totalUsers: number;
    totalPortfolios: number;
    publishedPortfolios: number;
    totalProjects: number;
    totalPosts: number;
    totalMessages: number;
    totalSkills: number;
    totalExperiences: number;
    totalTestimonials: number;
    totalReservedSlugs: number;
    activeAnnouncementsCount: number;
    totalAuditLogs: number;
  };
  templateDistribution: {
    "classic-dev": number;
    "nova-engine": number;
    "apex-studio": number;
  };
  roleDistribution: {
    superadmin: number;
    admin: number;
    user: number;
  };
  recentUsers: Array<{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: string;
    lastLogin?: string;
  }>;
  systemInfo: {
    uptimeSeconds: number;
    nodeVersion: string;
    platform: string;
    memoryRssMb: number;
    memoryHeapUsedMb: number;
    memoryHeapTotalMb: number;
    environment: string;
  };
}

export interface IPlatformUserItem {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin" | "superadmin";
  createdAt: string;
  lastLogin?: string;
  profile?: {
    avatarUrl?: string;
    headline?: string;
    location?: string;
  } | null;
  portfolio?: {
    slug?: string;
    templateId?: string;
    isPublished?: boolean;
    customDomain?: string;
  } | null;
  projectCount: number;
}

export interface IPlatformUsersResponse {
  users: IPlatformUserItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface IReservedSlugItem {
  _id: string;
  slug: string;
  reason: string;
  isSystem: boolean;
  createdAt: string;
}

export interface ITemplateSettingItem {
  _id: string;
  templateId: "classic-dev" | "nova-engine" | "apex-studio";
  name: string;
  description: string;
  status: "active" | "pro" | "beta" | "maintenance";
  isFeatured: boolean;
  order: number;
  tags: string[];
  previewImageUrl?: string;
}

export interface IAnnouncementItem {
  _id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "announcement";
  targetAudience: "all" | "developers" | "public";
  isActive: boolean;
  linkUrl?: string;
  linkText?: string;
  expiresAt?: string;
  createdAt: string;
  createdBy?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

export interface IAuditLogItem {
  _id: string;
  action: string;
  category: "auth" | "user_management" | "domain" | "template" | "announcement" | "system";
  performedBy?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
  };
  targetUser?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  targetEntityId?: string;
  entityType?: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export const platformApi = {
  // Stats
  getStats: async (): Promise<ApiResponse<IPlatformStats>> => {
    const res = await apiClient.get<ApiResponse<IPlatformStats>>("/platform/stats");
    return res.data;
  },

  // Users
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  }): Promise<ApiResponse<IPlatformUsersResponse>> => {
    const res = await apiClient.get<ApiResponse<IPlatformUsersResponse>>("/platform/users", {
      params,
    });
    return res.data;
  },

  updateUserRole: async (
    userId: string,
    role: "user" | "admin" | "superadmin",
  ): Promise<ApiResponse<{ _id: string; role: string }>> => {
    const res = await apiClient.patch<ApiResponse<{ _id: string; role: string }>>(
      `/platform/users/${userId}/role`,
      { role },
    );
    return res.data;
  },

  deleteUser: async (userId: string): Promise<ApiResponse<{ deletedUserId: string }>> => {
    const res = await apiClient.delete<ApiResponse<{ deletedUserId: string }>>(
      `/platform/users/${userId}`,
    );
    return res.data;
  },

  impersonateUser: async (
    userId: string,
  ): Promise<ApiResponse<{ user: any; tokens: { accessToken: string; refreshToken: string } }>> => {
    const res = await apiClient.post<
      ApiResponse<{ user: any; tokens: { accessToken: string; refreshToken: string } }>
    >(`/platform/users/${userId}/impersonate`);
    return res.data;
  },

  // Reserved Slugs
  getReservedSlugs: async (): Promise<ApiResponse<IReservedSlugItem[]>> => {
    const res = await apiClient.get<ApiResponse<IReservedSlugItem[]>>("/platform/slugs");
    return res.data;
  },

  addReservedSlug: async (slug: string, reason?: string): Promise<ApiResponse<IReservedSlugItem>> => {
    const res = await apiClient.post<ApiResponse<IReservedSlugItem>>("/platform/slugs", {
      slug,
      reason,
    });
    return res.data;
  },

  deleteReservedSlug: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    const res = await apiClient.delete<ApiResponse<{ id: string }>>(`/platform/slugs/${id}`);
    return res.data;
  },

  // Templates
  getTemplates: async (): Promise<ApiResponse<ITemplateSettingItem[]>> => {
    const res = await apiClient.get<ApiResponse<ITemplateSettingItem[]>>("/platform/templates");
    return res.data;
  },

  updateTemplate: async (
    templateId: string,
    data: Partial<ITemplateSettingItem>,
  ): Promise<ApiResponse<ITemplateSettingItem>> => {
    const res = await apiClient.patch<ApiResponse<ITemplateSettingItem>>(
      `/platform/templates/${templateId}`,
      data,
    );
    return res.data;
  },

  // Announcements
  getAnnouncements: async (): Promise<ApiResponse<IAnnouncementItem[]>> => {
    const res = await apiClient.get<ApiResponse<IAnnouncementItem[]>>("/platform/announcements");
    return res.data;
  },

  createAnnouncement: async (
    data: Partial<IAnnouncementItem>,
  ): Promise<ApiResponse<IAnnouncementItem>> => {
    const res = await apiClient.post<ApiResponse<IAnnouncementItem>>(
      "/platform/announcements",
      data,
    );
    return res.data;
  },

  updateAnnouncement: async (
    id: string,
    data: Partial<IAnnouncementItem>,
  ): Promise<ApiResponse<IAnnouncementItem>> => {
    const res = await apiClient.patch<ApiResponse<IAnnouncementItem>>(
      `/platform/announcements/${id}`,
      data,
    );
    return res.data;
  },

  deleteAnnouncement: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    const res = await apiClient.delete<ApiResponse<{ id: string }>>(
      `/platform/announcements/${id}`,
    );
    return res.data;
  },

  getActivePublicAnnouncements: async (): Promise<ApiResponse<IAnnouncementItem[]>> => {
    const res = await apiClient.get<ApiResponse<IAnnouncementItem[]>>(
      "/platform/announcements/active",
    );
    return res.data;
  },

  // Audit Logs
  getAuditLogs: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
  }): Promise<
    ApiResponse<{
      logs: IAuditLogItem[];
      pagination: { total: number; page: number; limit: number; totalPages: number };
    }>
  > => {
    const res = await apiClient.get<
      ApiResponse<{
        logs: IAuditLogItem[];
        pagination: { total: number; page: number; limit: number; totalPages: number };
      }>
    >("/platform/logs", { params });
    return res.data;
  },
};
