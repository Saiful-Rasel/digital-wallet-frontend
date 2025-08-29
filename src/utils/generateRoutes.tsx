import type { IsidebarItem } from "@/types";

export const generateRoute = (sidebarItem : IsidebarItem[]) => {
    
    return sidebarItem.flatMap((section) => section.items.map((route) => ({
        path:route.url,
        Component:route.component
    })))
}