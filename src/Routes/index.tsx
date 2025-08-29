import { createBrowserRouter } from "react-router";
import App from "../App";
import About from "../Pages/public/About";


import Login from "@/Pages/public/Login";
import Register from "@/Pages/public/Register";
import DashboardLayout from "@/Layout/DashboardLayout";

import { generateRoute } from "@/utils/generateRoutes";
import { AdminSidebar } from "./AdminSidebar";
import { AgentSidebar } from "./AgentSidebar";

import { UserSidebar } from "./userSidebar";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constant/role";
import type { Trole } from "@/types";
import UnAuthorized from "@/Pages/agent/UnAuthorized";
import HomePage from "@/Pages/public/HomePage";
import FeaturesPage from "@/Pages/public/Feature";
import FAQPage from "@/Pages/public/FAQPage";
import PricingPage from "@/Pages/public/Pricing";
import ContactPage from "@/Pages/public/ContactPage";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "features",
        Component: FeaturesPage,
      },
      {
        path: "faq",
        Component: FAQPage,
      },
      {
        path: "pricing",
        Component: PricingPage,
      },
      {
        path: "contact",
        Component: ContactPage,
      },
    ],
  },
  {
    path: "/user",
    Component: withAuth(DashboardLayout,role.user as Trole),
    children:[
      ...generateRoute(UserSidebar)
    ]
  },
  {
    path: "/agent",
    Component:  withAuth(DashboardLayout,role.agent as Trole),
    children:[
      ...generateRoute(AgentSidebar)
    ]
  },
  {
    path: "/admin",
    Component:  withAuth(DashboardLayout,role.admin as Trole),
    children:[
      ...generateRoute(AdminSidebar)
    ]
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/unauthorized",
    Component: UnAuthorized,
  },
]);
