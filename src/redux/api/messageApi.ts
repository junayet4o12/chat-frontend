import { baseApi } from "./baseApi";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/messages/send",
        method: "POST",
        body: data,
      }),
    }),

    getConversation: builder.query({
      query: (queryParams) => ({
        url: "/messages/conversation",
        method: "GET",
        params: queryParams,
      }),
    }),

    markMessageAsRead: builder.mutation({
      query: (messageId: string) => ({
        url: `/messages/mark-read/${messageId}`,
        method: "PATCH",
      }),
    }),

    deleteMessage: builder.mutation({
      query: (messageId: string) => ({
        url: `/messages/delete/${messageId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetConversationQuery,
  useMarkMessageAsReadMutation,
  useDeleteMessageMutation,
} = messageApi;
