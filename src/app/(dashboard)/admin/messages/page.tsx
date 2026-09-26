import React, { Suspense } from "react";
import type { Metadata } from "next";
import { MessagesView } from "@/components/admin/views/messages-view";

export const metadata: Metadata = {
  title: "Inquiries & CRM | Admin Studio",
  description: "Manage client leads, consultation requests, and transactional email replies.",
};

export default function AdminMessagesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading inquiries...</div>}>
      <MessagesView />
    </Suspense>
  );
}
