import { apiClient } from "../axios";
import { ApiResponse, IMessage, MessageStatus } from "@/interfaces";

export interface MessageQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export const messagesApi = {
  getMessages: async (params?: MessageQueryParams): Promise<ApiResponse<IMessage[]>> => {
    const { data } = await apiClient.get<ApiResponse<IMessage[]>>("/messages", {
      params,
    });
    return data;
  },

  getById: async (id: string): Promise<ApiResponse<IMessage>> => {
    const { data } = await apiClient.get<ApiResponse<IMessage>>(`/messages/${id}`);
    return data;
  },

  create: async (payload: {
    senderName: string;
    senderEmail: string;
    subject?: string;
    message: string;
    company?: string;
    budgetRange?: string;
  }): Promise<ApiResponse<IMessage>> => {
    const { data } = await apiClient.post<ApiResponse<IMessage>>(
      "/messages",
      payload
    );
    return data;
  },

  updateStatus: async (
    id: string,
    status: MessageStatus
  ): Promise<ApiResponse<IMessage>> => {
    const { data } = await apiClient.patch<ApiResponse<IMessage>>(
      `/messages/${id}/status`,
      { status }
    );
    return data;
  },

  reply: async (
    id: string,
    replyMessage: string
  ): Promise<ApiResponse<IMessage>> => {
    const { data } = await apiClient.post<ApiResponse<IMessage>>(
      `/messages/${id}/reply`,
      { replyMessage }
    );
    return data;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const { data } = await apiClient.delete<ApiResponse<null>>(`/messages/${id}`);
    return data;
  },
};
