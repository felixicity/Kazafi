// features/payment/paymentMethodSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, setToLocalStorage } from "../utilities/localStorageUtils";

const initialState = {
      paymentMethod: getFromLocalStorage("paymentMethod", ""),
};

const paymentMethodSlice = createSlice({
      name: "paymentMethod",
      initialState,
      reducers: {
            savePaymentMethod(state, action) {
                  state.paymentMethod = action.payload;
                  setToLocalStorage("paymentMethod", action.payload);
            },
            clearPaymentMethod(state) {
                  state.method = "";
                  setToLocalStorage("paymentMethod", "");
            },
      },
});

export const { savePaymentMethod, clearPaymentMethod } = paymentMethodSlice.actions;

export default paymentMethodSlice.reducer;
