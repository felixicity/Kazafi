import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const clientCartSlice = createSlice({
      name: "cart",
      initialState,
      reducers: {
            addToCart: (state, action) => {
                  state.cartItems = action.payload;
            },

            removeFromCart: (state, action) => {
                  state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
            },

            increaseItemQty: (state, action) => {
                  const itemId = action.payload;
                  const existingItem = state.cartItems.find((item) => item.id === itemId);
                  existingItem.quantity = existingItem.quantity + 1;
            },
            decreaseItemQty: (state, action) => {
                  const itemId = action.payload;
                  const existingItem = state.cartItems.find((item) => item.id === itemId);
                  existingItem.quantity = existingItem.quantity - 1;
            },
            saveShippingAddress: (state, action) => {
                  state.shippingAddress = action.payload;
            },

            savePaymentMethod: (state, action) => {
                  state.paymentMethod = action.payload;
            },

            calculateTotalPrice: (state) => {
                  state.totalPrice =
                        state.cartItems.length > 0
                              ? state.cartItems
                                      .map((item) => item.price * item.quantity)
                                      .reduce((acc, num) => acc + num, 0)
                              : 0;
            },

            calculateTotalQuantity: (state) => {
                  state.totalQuantity =
                        state?.cartItems.length > 0
                              ? state.cartItems.map((item) => item.quantity).reduce((acc, num) => acc + num, 0)
                              : 0;
            },

            clearCart: (state) => {
                  state.cartItems = [];
            },
      },
});

export const {
      addToCart,
      removeFromCart,
      increaseItemQty,
      decreaseItemQty,
      saveShippingAddress,
      savePaymentMethod,
      clearCart,
      calculateTotalPrice,
      calculateTotalQuantity,
} = clientCartSlice.actions;

export default clientCartSlice.reducer;
