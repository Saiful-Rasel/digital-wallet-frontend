

import { useUserInfoQuery } from "@/Redux/feature/auth/auth.api";
import type { Trole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, withRole?: Trole) => {
  return function AuthWrapper() {
    const {data,isLoading} = useUserInfoQuery(undefined)
    if(!isLoading && !data?.data?.email){
        return <Navigate to="/login"/>
    }
    if(withRole && !isLoading && withRole !== data?.data?.role){
        return <Navigate to="/unauthorized"/>
    }
    return <Component />;
  };
};
