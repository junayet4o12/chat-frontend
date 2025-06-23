import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    getFriends: builder.query({
      query: () => ({
        url: "/users/friends",
        method: "GET",
      }),
    }),

    getMyProfile: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),

    getSingleUser: builder.query({
      query: (userId: string) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
    }),

    updateMyProfile: builder.mutation({
      query: (userInfo) => ({
        url: "/users/update-profile",
        method: "PUT",
        body: userInfo,
      }),
    }),

    updateUserRoleStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/update-user/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetFriendsQuery,
  useGetMyProfileQuery,
  useGetSingleUserQuery,
  useUpdateMyProfileMutation,
  useUpdateUserRoleStatusMutation,
} = userApi;
