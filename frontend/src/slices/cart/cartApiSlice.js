import { apiSlice } from "../apiSlice";
import { addToCart as addToCartClient } from "./clientCartSlice";
import { discountCalculator } from "../../utilities/discountCalculator";

const CART_URL = "http://localhost:5000/api/cart";

const cartApiSlice = apiSlice.injectEndpoints({
      endpoints: (builder) => ({
            addToCart: builder.mutation({
                  query: (data) => ({
                        url: `${CART_URL}/add`,
                        method: "POST",
                        body: data,
                  }),
                  async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                        try {
                              const { data } = await queryFulfilled;

                              // Save to cart format — fine-tuned
                              const refinedCart = data.populatedCart.items.map((item) => ({
                                    id: item.variation._id,
                                    name: item.product.name,
                                    quantity: item.quantity,
                                    image: item.variation.imageURLs[0],
                                    price: discountCalculator(item.variation.price, item.variation.discount),
                              }));

                              // Dispatch to your slice
                              dispatch(addToCartClient(refinedCart));
                        } catch (err) {
                              console.error("Failed to update localStorage: ", err);
                        }
                  },
            }),
            removeFromCart: builder.mutation({
                  query: (itemId) => ({
                        url: `${CART_URL}/remove/${itemId}`,
                        method: "DELETE",
                  }),
            }),
            updateItemQuantity: builder.mutation({
                  query: (data) => ({
                        url: `${CART_URL}/update/${data}`,
                        method: "PUT",
                  }),
            }),
            getCart: builder.query({
                  query: () => ({
                        url: CART_URL,
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
      useAddToCartMutation,
      useRemoveFromCartMutation,
      useUpdateItemQuantityMutation,
      useGetCartQuery,
      useClearCartMutation,
} = cartApiSlice;
