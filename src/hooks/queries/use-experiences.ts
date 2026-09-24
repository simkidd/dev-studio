import { useQuery } from "@tanstack/react-query";
import { experiencesApi } from "@/lib/api";

export const useExperiences = (type?: string) => {
  return useQuery({
    queryKey: ["experiences", type],
    queryFn: async () => {
      const res = await experiencesApi.getExperiences(type);
      return res.data || [];
    },
  });
};
