import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";

export const usePortfolioSettings = () => {
  return useQuery({
    queryKey: ["portfolio-settings"],
    queryFn: async () => {
      const response = await portfolioApi.getSettings();
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const usePublicPortfolio = (slug: string) => {
  return useQuery({
    queryKey: ["public-portfolio", slug],
    queryFn: async () => {
      if (!slug) return null;
      const response = await portfolioApi.getBySlug(slug);
      return response.data;
    },
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};
