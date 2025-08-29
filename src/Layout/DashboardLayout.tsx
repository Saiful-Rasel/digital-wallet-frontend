import { AppSidebar } from "@/components/app-sidebar";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { useWalletHistoryQuery } from "@/Redux/feature/wallet/wallet.api";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  const { data } = useWalletHistoryQuery(undefined);

  const balance = data?.data?.balance | 0;
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center justify-between gap-2 px-3">
            <SidebarTrigger />

            <Separator orientation="vertical" className="mr-2 h-4" />
            <p className="md:text-2xl font-semibold">
              Balance <span>${balance}</span>
            </p>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet></Outlet>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
