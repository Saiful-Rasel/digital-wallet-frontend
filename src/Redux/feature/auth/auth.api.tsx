import { baseApi } from "../../baseApi";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    LogOut: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),

    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
   
    allUserInfoTransfer: builder.query({
      query: () => ({
        url: `/user/all-user?purpose=transfer`,
        method: "GET",
      }),
      providesTags: ["USER", "TRANSACTION", "WALLET"],
    }),
    allUserInfoCashout: builder.query({
      query: () => ({
        url: `/user/all-user?purpose=cashout`,
        method: "GET",
      }),
      providesTags: ["USER", "TRANSACTION", "WALLET"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogOutMutation,
  useUserInfoQuery,
  useAllUserInfoTransferQuery,
  useAllUserInfoCashoutQuery,

} = authApi;
