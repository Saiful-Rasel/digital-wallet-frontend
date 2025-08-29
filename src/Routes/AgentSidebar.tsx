import CashIn from "@/Pages/agent/CashIn";
import TransactionHistory from "@/Pages/agent/TransactionHistory";
import type { IsidebarItem } from "@/types";

export const AgentSidebar: IsidebarItem[] = [
  {
    title: "Agent Dashboard",
    url: "#",
    items: [
      {
        title: "Cash In",
        url: "/agent/cash-in",
        component: CashIn,
      },
      {
        title: "History",
        url: "/agent/history",
        component: TransactionHistory,
      },
    ],
  },
];
