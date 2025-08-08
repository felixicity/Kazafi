import { apiSlice } from "./apiSlice";

const PRODUCT_URL = "http://localhost:5000/api/products";

const productApiSlice = apiSlice.injectEndpoints({
      endpoints: (builder) => ({
            createProduct: builder.mutation({
                  query: (data) => ({
                        url: `${PRODUCT_URL}/create`,
                        method: "POST",
                        body: data,
                  }),
            }),
            getProducts: builder.query({
                  query: () => PRODUCT_URL,
                  //   providesTags: ["Products"],
            }),

            getSingleProduct: builder.query({
                  query: (data) => ({
                        url: `${PRODUCT_URL}/${data}`,
                  }),
            }),
            updateProduct: builder.mutation({
                  query: (data, PARAM) => ({
                        url: `${PRODUCT_URL}/${PARAM}`,
                        method: "PUT",
                        body: data,
                  }),
            }),
            deleteProduct: builder.mutation({
                  query: (PARAM) => ({
                        url: `${PRODUCT_URL}/${PARAM}`,
                        method: "DELETE",
                  }),
            }),
      }),
});

export const {
      useCreateProductMutation,
      useGetProductsQuery,
      useGetSingleProductQuery,
      useUpdateProductMutation,
      useDeleteProductMutation,
} = productApiSlice;
