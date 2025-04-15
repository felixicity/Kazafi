import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, setToLocalStorage } from "../../utilities/localStorageUtils";

const initialState = {
      cartItems: getFromLocalStorage("cartItems", []),
      shippingAddress: getFromLocalStorage("shippingAddress", []),
      paymentMethod: getFromLocalStorage("paymentMethod", ""),
      totalPrice: getFromLocalStorage("totalPrice", ""),
      totalQuantity: getFromLocalStorage("totalQuantity", ""),
};

const clientCartSlice = createSlice({
      name: "cart",
      initialState,
      reducers: {
            addToCart: (state, action) => {
                  const productId = action.payload;
                  const existingItem = state.cartItems.find((item) => item.id === productId);

                  if (existingItem) {
                        existingItem.quantity = existingItem.quantity + 1;
                  } else {
                        //Find the product in the list of Products from the database and push to the cartItems
                        const product = {};
                        state.cartItems.unshift(product);
                  }

                  setToLocalStorage("cartItems", state.cartItems);
            },

            removeFromCart: (state, action) => {
                  const itemId = action.payload;
                  state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
                  setToLocalStorage("cartItems", state.cartItems);
            },

            saveShippingAddress: (state, action) => {
                  state.shippingAddress = action.payload;
                  setToLocalStorage("shippingAddress", state.shippingAddress);
            },

            savePaymentMethod: (state, action) => {
                  state.paymentMethod = action.payload;
                  setToLocalStorage("paymentMethod", state.paymentMethod);
            },

            calculateTotalPrice: (state) => {
                  state.totalPrice = state.cartItems
                        .map((item) => item.price * item.quantity)
                        .reduce((acc, num) => acc + num, 0);
            },

            calculateTotalQuantity: (state) => {
                  state.totalQuantity = state.cartItems.map((item) => item.quantity).reduce((acc, num) => acc + num, 0);
            },

            clearCart: (state) => {
                  state.cartItems = [];
                  setToLocalStorage("cartItems", []);
            },
      },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCart } = clientCartSlice.actions;

export default clientCartSlice.reducer;
