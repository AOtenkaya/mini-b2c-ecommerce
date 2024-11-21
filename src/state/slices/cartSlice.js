import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart as addToCartApi,
  updateCartQuantity as updateCartQuantityApi,
  deleteFromCart as deleteFromCartApi,
} from "../../services/api";

export const addToCart = createAsyncThunk("cart/addToCart", async (product) => {
  const addedProduct = await addToCartApi(product);
  return addedProduct;
});

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ cartItemId, quantity }) => {
    const updatedItem = await updateCartQuantityApi(cartItemId, quantity);
    return updatedItem;
  }
);

export const deleteFromCart = createAsyncThunk(
  "cart/deleteFromCart",
  async (cartItemId) => {
    await deleteFromCartApi(cartItemId);
    return cartItemId;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(updateCartQuantity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(deleteFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
