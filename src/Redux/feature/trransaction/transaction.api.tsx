import { baseApi } from "@/Redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    transactionHistory: builder.query({
      query: () => ({
        url: "/transaction/me",
        method: "GET",
      }),
      providesTags: ["TRANSACTION"],
    }),
  }),
});

export const { useTransactionHistoryQuery } = transactionApi;
