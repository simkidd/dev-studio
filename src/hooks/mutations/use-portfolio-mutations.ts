import { useMutation, useQueryClient } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";
import { IUpdatePortfolioPayload } from "@/interfaces";
import { toast } from "sonner";

export const useUpdatePortfolioSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: IUpdatePortfolioPayload) => {
      const response = await portfolioApi.updateSettings(payload);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["portfolio-settings"], data);
      queryClient.invalidateQueries({ queryKey: ["portfolio-settings"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      toast.success("Portfolio settings updated successfully");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to update portfolio settings";
      toast.error(message);
    },
  });
};
