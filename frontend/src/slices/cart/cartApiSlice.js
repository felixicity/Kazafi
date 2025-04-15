import { apiSlice } from "../apiSlice";
const CART_URL = "localhost:5000/api/cart";

const cartApiSlice = apiSlice.injectEndpoints({
      endpoints: (builder) => ({
            addToCart: builder.mutation({
                  query: (data) => ({
                        url: `${CART_URL}/add`,
                        method: "POST",
                        body: data,
                  }),
            }),
            removeFromCart: builder.mutation({
                  query: (data) => ({
                        url: `${CART_URL}/remove/:${data}`,
                        method: "DELETE",
                  }),
            }),
            updateItemQuantity: builder.mutation({
                  query: (data) => ({
                        url: `${CART_URL}/update/:${data}`,
                        method: "PUT",
                  }),
            }),
            getCart: builder.mutation({
                  query: () => ({
                        url: CART_URL,
                        method: "GET",
                  }),
            }),
            clearCart: builder.mutation({
                  query: () => ({
                        url: `${CART_URL}/clear`,
                        method: "DELETE",
                  }),
            }),
      }),
});

export const {
      useAddToCArtMutation,
      useRemoveFromCartMutation,
      useUpdateItemQuantityMutation,
      useGetCartMutation,
      useClearCartMutation,
} = cartApiSlice;
