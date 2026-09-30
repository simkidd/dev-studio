import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";
import { getStaticDemoBundle } from "@/lib/demo-data";

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

export const usePublicPortfolio = (slug: string, templateOverride?: string) => {
  const staticDemo = getStaticDemoBundle(slug, templateOverride);

  return useQuery({
    queryKey: ["public-portfolio", slug, templateOverride],
    queryFn: async () => {
      if (!slug) return null;

      try {
        const response = await portfolioApi.getBySlug(slug);
        const data = response.data;
        if (data && templateOverride) {
          data.portfolio.templateId = templateOverride as any;
        }
        return data;
      } catch (err) {
        // Hybrid fallback: If server is offline, cold-starting, or database isn't seeded yet,
        // seamlessly fall back to the static demo bundle for known demo slugs
        if (staticDemo) {
          return staticDemo;
        }
        throw err;
      }
    },
    // If it's a known demo slug, hydrate immediately for 0ms initial load
    initialData: staticDemo || undefined,
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 2,
    retry: staticDemo ? false : 1,
  });
};
