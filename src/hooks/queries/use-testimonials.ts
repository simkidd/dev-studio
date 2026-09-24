import { useQuery } from "@tanstack/react-query";
import { testimonialsApi } from "@/lib/api";

export const useTestimonials = (featured?: boolean) => {
  return useQuery({
    queryKey: ["testimonials", featured],
    queryFn: async () => {
      const res = await testimonialsApi.getTestimonials(featured);
      return res.data || [];
    },
  });
};
