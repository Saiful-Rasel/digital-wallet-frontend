import type { ComponentType } from "react"

export interface IsidebarItem {
    title:string,
    url:string,
    items:{
        title:string,
        url:string,
        component:ComponentType
    }[]

}


export type Trole = "USER" | "AGENT" | "ADMIN"