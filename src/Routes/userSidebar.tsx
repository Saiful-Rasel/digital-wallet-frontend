
import Deposit from "@/Pages/User/Deposit";
import TransactionHistory from "@/Pages/User/History";


import Transfer from "@/Pages/User/Transfer";
import UserOverview from "@/Pages/User/UserOverView";
import Withdraw from "@/Pages/User/Withdraw";
import type { IsidebarItem } from "@/types";

export const UserSidebar:IsidebarItem[] =  [
    {
      title: "User Dashboard",
      url: "#",
      items: [
        {
          title: "OverView",
          url: "/user/overview",
          component:UserOverview
        },
        {
          title: "deposit",
          url: "/user/deposit",
          component:Deposit
        },
        {
          title: "Withdraw",
          url: "/user/withdraw",
          component:Withdraw
        },
        {
          title: "Transfer",
          url: "/user/transfer",
          component:Transfer
        },
         {
          title: "History",
          url: "/user/history",
          component:TransactionHistory
        },
        
      ],
    },
  ]