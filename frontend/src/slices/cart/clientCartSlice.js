import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, setToLocalStorage } from "../../utilities/localStorageUtils";

const { cartItems, shippingAddress, paymentMethod, totalPrice, totalQuantity } = getFromLocalStorage("cart", []);

const initialState = {
      cartItems: cartItems || [],
      shippingAddress: shippingAddress || [],
      paymentMethod: paymentMethod || "",
      totalPrice: totalPrice || 0,
      totalQuantity: totalQuantity || 0,
};

const clientCartSlice = createSlice({
      name: "cart",
      initialState,
      reducers: {
            addToCart: (state, action) => {
                  state.cartItems = action.payload;
                  setToLocalStorage("cart", state);
            },

            removeFromCart: (state, action) => {
                  state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
                  setToLocalStorage("cart", state);
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
                  console.log(action.payload);
                  setToLocalStorage("cart", state);
            },

            savePaymentMethod: (state, action) => {
                  state.paymentMethod = action.payload;
                  setToLocalStorage("cart", state);
            },

            calculateTotalPrice: (state) => {
                  state.totalPrice =
                        state.cartItems.length > 0
                              ? state.cartItems
                                      .map((item) => item.price * item.quantity)
                                      .reduce((acc, num) => acc + num, 0)
                              : 0;
                  setToLocalStorage("cart", state);
            },

            calculateTotalQuantity: (state) => {
                  state.totalQuantity =
                        state.cartItems.length > 0
                              ? state.cartItems.map((item) => item.quantity).reduce((acc, num) => acc + num, 0)
                              : 0;
                  setToLocalStorage("cart", state);
            },

            clearCart: (state) => {
                  state.cartItems = [];
                  setToLocalStorage("cart", []);
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
