'use client';

import { Home, Users, MessagesSquare, ChartLine } from "lucide-react";
import { useState } from "react";

import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarRail,
  SidebarTrigger
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Patients",
    url: "/dashboard/patients",
    icon: Users,
  },
  {
    title: "Conversations",
    url: "/dashboard/conversations",
    icon: MessagesSquare,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: ChartLine,
  },
];

export function AppSidebar() {
  const [collapsed, setIsCollapsed] = useState(false);


  return (
    <Sidebar collapsible="icon">
      <div className="flex justify-between items-center mr-3">
        <SidebarHeader className="text-2xl font-bold text-blue-400">
            EchoHealth
          </SidebarHeader>
          <SidebarTrigger/>
      </div>
      
      
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span className="font-bold">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <div className="text-center text-gray-500 text-sm">
          &copy; 2024 EchoHealth
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
