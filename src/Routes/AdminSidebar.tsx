
import AllAgent from "@/Pages/Admin/AllAgent";
import AllTransactionHistory from "@/Pages/Admin/Alltransaction";
import Alluser from "@/Pages/Admin/AllUser";
import type { IsidebarItem } from "@/types";

export const AdminSidebar:IsidebarItem[] =  [
    {
      title: "Admin Dashboard",
      url: "#",
      items: [
        {
          title: "All-User",
          url: "/admin/all-user",
          component:Alluser
        },
        {
          title: "All-Agent",
          url: "/admin/all-agent",
          component:AllAgent
        },
        {
          title: "All-transaction",
          url: "/admin/all-transaction",
          component:AllTransactionHistory
        },
        
      ],
    },
  ]