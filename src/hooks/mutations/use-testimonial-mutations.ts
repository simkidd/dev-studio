import { useMutation, useQueryClient } from "@tanstack/react-query";
import { testimonialsApi } from "@/lib/api";
import { ITestimonial } from "@/interfaces";
import { toast } from "sonner";

export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<ITestimonial>) => {
      const res = await testimonialsApi.create(payload);
      return res.data;
    },
    onSuccess: (newTestimonial) => {
      toast.success(
        `Testimonial from "${newTestimonial?.clientName}" added`
      );
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to add testimonial"
      );
    },
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<ITestimonial>;
    }) => {
      const res = await testimonialsApi.update(id, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Testimonial updated successfully");
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update testimonial"
      );
    },
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await testimonialsApi.delete(id);
      return res;
    },
    onSuccess: () => {
      toast.success("Testimonial removed");
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to delete testimonial"
      );
    },
  });
};
