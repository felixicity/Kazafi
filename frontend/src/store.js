import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/user/clientAuthSlice";
import { apiSlice } from "./slices/apiSlice";
import cartReducer from "./slices/cart/clientCartSlice";
import PaymentMethodReducer from "./slices/paymentMethodSlice";
import shippingAddressReducer from "./slices/shippingAddressSlice";

const store = configureStore({
      reducer: {
            auth: authReducer,
            cart: cartReducer,
            shippingAddress: shippingAddressReducer,
            PaymentMethod: PaymentMethodReducer,
            [apiSlice.reducerPath]: apiSlice.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
      devTools: true,
});

export default store;
