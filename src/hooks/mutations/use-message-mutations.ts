import { useMutation, useQueryClient } from "@tanstack/react-query";
import { messagesApi } from "@/lib/api";
import { IMessage, MessageStatus } from "@/interfaces";
import { toast } from "sonner";

export const useUpdateMessageStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: MessageStatus;
    }) => {
      const res = await messagesApi.updateStatus(id, status);
      return res.data;
    },
    onSuccess: (updated) => {
      toast.success(`Message marked as ${updated?.status}`);
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update status");
    },
  });
};

export const useReplyMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, reply }: { id: string; reply: string }) => {
      const res = await messagesApi.reply(id, reply);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Reply email dispatched to client successfully");
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to send reply");
    },
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await messagesApi.delete(id);
      return res;
    },
    onSuccess: () => {
      toast.success("Message deleted");
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete message");
    },
  });
};

export const useSubmitContactMessage = () => {
  return useMutation({
    mutationFn: async (payload: {
      senderName: string;
      senderEmail: string;
      subject?: string;
      message: string;
      company?: string;
      budgetRange?: string;
    }) => {
      const res = await messagesApi.create(payload);
      return res;
    },
    onSuccess: () => {
      toast.success("Thank you! Your message has been transmitted. I will respond within 24 hours.");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to submit message. Please try again.");
    },
  });
};
