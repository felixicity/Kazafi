import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
};

const clientAuthSlice = createSlice({
      name: "auth",
      initialState,
      reducers: {
            setCredentials: (state, action) => {
                  state.userInfo = action.payload;
                  localStorage.setItem("userInfo", JSON.stringify(action.payload));
            },
            clearCredentials: (state) => {
                  state.userInfo = null;
                  localStorage.removeItem("userInfo");
            },
      },
});
export const { setCredentials, clearCredentials } = clientAuthSlice.actions;
export default clientAuthSlice.reducer;
