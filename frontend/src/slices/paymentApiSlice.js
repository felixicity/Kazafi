import { apiSlice } from "./apiSlice";

const PAYMENT_URL = "http://localhost:5000/api/payments";

const paymentApiSlice = apiSlice.injectEndpoints({
      endpoints: (builder) => ({
            makePayment: builder.mutation({
                  query: (data) => ({
                        url: `${PAYMENT_URL}/initiate`,
                        method: "POST",
                        body: data,
                  }),
            }),
            verifyPayment: builder.query({
                  query: (PARAM) => ({
                        url: `${PAYMENT_URL}/verify/${PARAM}`,
                        method: "GET",
                  }),
            }),
      }),
});

export const { useVerifyPaymentQuery, useMakePaymentMutation } = paymentApiSlice;
