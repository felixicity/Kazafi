import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api"; // e.g., Axios or Fetch wrapper

export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity }, thunkAPI) => {
      const response = await api.post("/cart/add", { productId, quantity });
      return response.data;
});
