import { apiSlice } from "./apiSlice";

const PAYMENT_URL = "localhost:5000/api/payment";

const paymentApiSlice = apiSlice.injectEndpoints({
      endpoints: (builder) => ({
            makePayment: builder.mutation({
                  query: (data) => ({
                        url: `${PAYMENT_URL}/initiate`,
                        method: "POST",
                        body: data,
                  }),
            }),
      }),
});

export const { useMakePaymentMutation } = paymentApiSlice;
