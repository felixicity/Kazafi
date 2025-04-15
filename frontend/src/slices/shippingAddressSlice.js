import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, setToLocalStorage } from "../utilities/localStorageUtils";

const initialState = {
      address: getFromLocalStorage("shippingAddress", {}),
};

const shippingAddressSlice = createSlice({
      name: "shippingAddress",
      initialState,
      reducers: {
            saveShippingAddress(state, action) {
                  state.address = action.payload;
                  setToLocalStorage("shippingAddress", state.address);
            },
            clearShippingAddress(state) {
                  state.address = {};
                  setToLocalStorage("shippingAddress", {});
            },
      },
});

export const { saveShippingAddress, clearShippingAddress } = shippingAddressSlice.actions;

export default shippingAddressSlice.reducer;
