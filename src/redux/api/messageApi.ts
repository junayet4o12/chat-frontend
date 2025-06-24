import { baseApi } from "./baseApi";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/messages/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Message"],
    }),

    getConversation: builder.query({
      query: (queryParams) => ({
        url: "/messages/conversation",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["Message"],
    }),

    markMessageAsRead: builder.mutation({
      query: (messageId: string) => ({
        url: `/messages/mark-read/${messageId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Message"],
    }),

    deleteMessage: builder.mutation({
      query: (messageId: string) => ({
        url: `/messages/delete/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Message"],
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetConversationQuery,
  useMarkMessageAsReadMutation,
  useDeleteMessageMutation,
} = messageApi;
