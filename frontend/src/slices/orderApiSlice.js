import { apiSlice } from "./apiSlice";
const ORDERS_URL = "http://localhost:5000/api/orders";

//   orderDetails: {
//     orderId: "order123",
//     status: "processing",
//     items: [...],
//     shippingAddress: {...},
//   },
//   loading: false,
//   error: null,

const ordersApiSlice = apiSlice.injectEndpoints({
      endpoints: (builder) => ({
            createOrder: builder.mutation({
                  query: (data) => ({
                        url: ORDERS_URL,
                        method: "POST",
                        body: data,
                  }),
            }),
            getUserOrders: builder.mutation({
                  query: () => ({
                        url: ORDERS_URL,
                        method: "GET",
                  }),
            }),
            cancelOrder: builder.mutation({
                  query: (PARAM) => ({
                        url: `${ORDERS_URL}/${PARAM}`,
                        method: "DELETE",
                  }),
            }),
            getOrder: builder.mutation({
                  query: (PARAMS) => ({
                        url: `${ORDERS_URL}/${PARAMS}`,
                        method: "GET",
                  }),
            }),
            getOrders: builder.mutation({
                  query: () => ({
                        url: ORDERS_URL,
                        method: "GET",
                  }),
            }),
      }),
});

export const {
      useCreateOrderMutation,
      useGetUserOrdersMutation,
      useCancelOrderMutation,
      useGetOrderMutation,
      useGetOrdersMutation,
} = ordersApiSlice;
