import { role } from "@/constant/role";
import { AdminSidebar } from "@/Routes/AdminSidebar";
import { AgentSidebar } from "@/Routes/AgentSidebar";
import { UserSidebar } from "@/Routes/userSidebar";
import type { Trole } from "@/types";

export const getSidebarItem = (userRole: Trole) => {
  switch (userRole) {
    case role.user:
      return [...UserSidebar];
    case role.agent:
      return [...AgentSidebar];
    case role.admin:
      return [...AdminSidebar];
    default:
       return []
  }
};
