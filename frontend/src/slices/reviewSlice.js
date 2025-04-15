import { apiSlice } from "./apiSlice";
const REVIEW_URL = "http://localhost:5000/api/reviews";

const reviewSlice = apiSlice.injectEndpoints({
      endpoints: (buillder) => ({
            addReview: buillder.mutation({
                  query: (data, PARAM) => ({
                        url: `${REVIEW_URL}/${PARAM}/add`,
                        method: "POST",
                        body: data,
                  }),
            }),
            updateReview: buillder.mutation({
                  query: (data, PARAM) => ({
                        url: `${REVIEW_URL}/${PARAM}/update`,
                        method: "PUT",
                        body: data,
                  }),
            }),
            getReviews: buillder.mutation({
                  query: (PARAM) => ({
                        url: `${REVIEW_URL}/${PARAM}`,
                        method: "GET",
                  }),
            }),
            deleteReview: buillder.mutation({
                  query: (PARAM) => ({
                        url: `${REVIEW_URL}/${PARAM}`,
                        method: "DELETE",
                  }),
            }),
      }),
});

export const { useAddReviewMutation, useUpdateReviewMutation, useGetReviewsMutation, useDeleteReviewMutation } =
      reviewSlice;
