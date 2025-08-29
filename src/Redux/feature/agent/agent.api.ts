import { baseApi } from "@/Redux/baseApi";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userCashOut: builder.mutation({
      query: (userInfo) => ({
        url: "/agent/cash-out",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags:["USER","TRANSACTION"]
    }),
    agentCashIn: builder.mutation({
      query: (userInfo) => ({
        url: "/agent/cash-in",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags:["USER","TRANSACTION"]
    }),
  }),
});

export const {useUserCashOutMutation,useAgentCashInMutation} = agentApi;
