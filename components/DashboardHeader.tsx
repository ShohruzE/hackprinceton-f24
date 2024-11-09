"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardHeader() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <SidebarTrigger />
        </div>
        <div>User PFP blah</div>
      </div>
    </div>
  );
}
