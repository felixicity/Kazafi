import { apiSlice } from "./apiSlice";

const WISHLIST_URL = "http://localhost:5000/api/wishlist";

const wishlistApiSlice = apiSlice.injectEndpoints({
      endpoints: (builder) => ({
            addToWishlist: builder.mutation({
                  query: (data) => ({
                        url: `${WISHLIST_URL}/add`,
                        method: "POST",
                        body: data,
                  }),
            }),
            getWishLlist: builder.mutation({
                  query: () => ({
                        url: `${WISHLIST_URL}`,
                        method: "GET",
                  }),
            }),
            removeFromWishlist: builder.mutation({
                  query: (PARAM) => ({
                        url: `${WISHLIST_URL}/${PARAM}`,
                        method: "DELETE",
                  }),
            }),
            clearWishlist: builder.mutation({
                  query: () => ({
                        url: `${WISHLIST_URL}/clear`,
                        method: "DELETE",
                  }),
            }),
      }),
});

export const { useAddToWishlistMutation, useGetWishlistMutation, useRemoveFromWishlistMutation, useClearWishlist } =
      wishlistApiSlice;
