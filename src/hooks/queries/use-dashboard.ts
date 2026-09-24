import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/lib/api";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => {
      const res = await dashboardApi.getStats();
      return res.data;
    },
    refetchInterval: 60000,
  });
};
