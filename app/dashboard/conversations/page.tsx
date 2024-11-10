"use client";

import ConversationHistory from "@/components/ConversationHistory";
import DashboardHeader from "@/components/DashboardHeader";

export default function ConversationsPage() {
  return (
    <div className="">
      <DashboardHeader></DashboardHeader>
      <ConversationHistory />
      <h1>Conversations Page</h1>
    </div>
  );
}
