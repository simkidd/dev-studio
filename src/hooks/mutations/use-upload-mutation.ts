import { useMutation } from "@tanstack/react-query";
import { uploadApi } from "@/lib/api";
import { IUploadResult } from "@/interfaces";
import { toast } from "sonner";

export const useUploadFile = () => {
  return useMutation({
    mutationFn: async ({
      file,
      folder = "portfolio",
    }: {
      file: File;
      folder?: string;
    }) => {
      const res = await uploadApi.uploadSingle(file, folder);
      return res.data;
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "File upload failed");
    },
  });
};

export const useUploadMultipleFiles = () => {
  return useMutation({
    mutationFn: async ({
      files,
      folder = "portfolio/gallery",
    }: {
      files: File[];
      folder?: string;
    }) => {
      const res = await uploadApi.uploadMultiple(files, folder);
      return res.data;
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Multiple files upload failed"
      );
    },
  });
};

export const useDeleteUploadedFile = () => {
  return useMutation({
    mutationFn: async (
      target: string | { publicId?: string; url?: string }
    ) => {
      const res = await uploadApi.deleteFile(target);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Image deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "File deletion failed");
    },
  });
};

