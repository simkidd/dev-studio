export type MessageStatus = "unread" | "read" | "replied" | "archived";

export interface IMessage {
  _id: string;
  senderName: string;
  senderEmail: string;
  subject?: string;
  message: string;
  company?: string;
  budgetRange?: string;
  status: MessageStatus;
  isReplied: boolean;
  repliedAt?: string;
  replyNotes?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
}
