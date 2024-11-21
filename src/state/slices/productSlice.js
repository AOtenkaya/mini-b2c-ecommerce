// src/state/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts as fetchProductsFromApi } from "../../services/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (searchQuery) => {
    const products = await fetchProductsFromApi(searchQuery);
    return products;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
