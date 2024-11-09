import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex h-screen w-full">
        <div className="grow bg-blue-50">
          <div className="p-4">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
}
