import { apiClient } from "../axios";
import { ApiResponse, IUploadResult } from "@/interfaces";

export const uploadApi = {
  uploadSingle: async (
    file: File,
    folder: string = "portfolio"
  ): Promise<ApiResponse<IUploadResult>> => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await apiClient.post<ApiResponse<IUploadResult>>(
      `/upload/single?folder=${folder}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  },

  uploadMultiple: async (
    files: File[],
    folder: string = "portfolio"
  ): Promise<ApiResponse<IUploadResult[]>> => {
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));

    const { data } = await apiClient.post<ApiResponse<IUploadResult[]>>(
      `/upload/multiple?folder=${folder}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  },

  deleteFile: async (
    target: string | { publicId?: string; url?: string }
  ): Promise<ApiResponse<null>> => {
    const payload =
      typeof target === "string"
        ? target.startsWith("http://") || target.startsWith("https://")
          ? { url: target }
          : { publicId: target }
        : target;

    const { data } = await apiClient.delete<ApiResponse<null>>("/upload", {
      data: payload,
    });
    return data;
  },
};

