import { baseApi } from "@/Redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminAllUser: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),
    adminAllAgent: builder.query({
      query: () => ({
        url: "/admin/agents",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),
    adminAlltransactions: builder.query({
      query: () => ({
        url: "/admin/transactions",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),
    approveUser: builder.mutation({
      query: (userId: string) => ({
        url: `/admin/approve/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["ADMIN"],
    }),
    susPendAgent: builder.mutation({
      query: (agentId: string) => ({
        url: `/admin/suspend/${agentId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["ADMIN"],
    }),
    block: builder.mutation({
      query: (walletId: string) => ({
        url: `/admin/block/${walletId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["ADMIN"],
    }),
    unBlock: builder.mutation({
      query: (walletId: string) => ({
        url: `/admin/unblock/${walletId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["ADMIN"],
    }),
    getWalletByUser: builder.query({
      query: (userId: string) => ({
        url: `/wallet/user/${userId}`,
        method: "GET",
      }),
      providesTags: ( userId) => [{ type: "WALLET", id: userId }],
    }),
  }),
});

export const {
  useAdminAllUserQuery,
  useAdminAllAgentQuery,
  useAdminAlltransactionsQuery,
  useApproveUserMutation,
  useSusPendAgentMutation,
  useBlockMutation,
  useUnBlockMutation,
  useLazyGetWalletByUserQuery,
} = adminApi;
