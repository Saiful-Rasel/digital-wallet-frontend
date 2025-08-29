import { baseApi } from "@/Redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    walletHistory: builder.query({
      query: () => ({
        url: "/wallet/me",
        method: "GET",
      }),
      providesTags: ["WALLET","TRANSACTION"],
    }),
    depositWallet: builder.mutation({
      query: (data) => ({
        url: "/wallet/deposit",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["WALLET","TRANSACTION"],
    }),

    transferWallet: builder.mutation({
      query: (data) => ({
        url: "/wallet/transfer",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["WALLET","TRANSACTION"],
    }),
  }),
});

export const {
  useWalletHistoryQuery,
  useDepositWalletMutation,

  useTransferWalletMutation,
} = walletApi;
