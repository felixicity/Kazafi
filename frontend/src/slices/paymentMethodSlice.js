// features/payment/paymentMethodSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, setToLocalStorage } from "../utilities/localStorageUtils";

const initialState = {
      method: getFromLocalStorage("paymentMethod", ""),
};

const paymentMethodSlice = createSlice({
      name: "paymentMethod",
      initialState,
      reducers: {
            savePaymentMethod(state, action) {
                  state.method = action.payload;
                  setToLocalStorage("paymentMethod", state.method);
            },
            clearPaymentMethod(state) {
                  state.method = "";
                  setToLocalStorage("paymentMethod", "");
            },
      },
});

export const { savePaymentMethod, clearPaymentMethod } = paymentMethodSlice.actions;

export default paymentMethodSlice.reducer;
