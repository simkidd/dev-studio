import { useQuery } from "@tanstack/react-query";
import { messagesApi, MessageQueryParams } from "@/lib/api";

export const useMessages = (params?: MessageQueryParams) => {
  return useQuery({
    queryKey: ["messages", params],
    queryFn: () => messagesApi.getMessages(params),
  });
};

export const useMessageById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["message", id],
    queryFn: async () => {
      const res = await messagesApi.getById(id);
      return res.data;
    },
    enabled: !!id && enabled,
  });
};
