import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateCartOnServer } from "../../services/api";
import { toast } from "react-toastify";
import { current } from "@reduxjs/toolkit";

// Helper functions to manage localStorage
const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart
    ? JSON.parse(cart)
    : {
        id: 1,
        userId: 1,
        products: [],
        rollbackCart: { id: 1, userId: 1, products: [] },
      };
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Async thunk to update the cart on the server
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (cart, { rejectWithValue }) => {
    try {
      const response = await updateCartOnServer(cart);
      return response; // Return the response data on success
    } catch (error) {
      return rejectWithValue(error.message); // Return error message on failure
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      // Save the current state for rollback before making the API call
      state.rollbackCart = current(state);

      const newProduct = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === newProduct.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...newProduct, quantity: 1 });
      }
    },

    increaseQuantity: (state, action) => {
      // Save the current state for rollback before making the API call
      state.rollbackCart = current(state);

      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      // Save the current state for rollback before making the API call
      state.rollbackCart = current(state);

      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      // Save the current state for rollback before making the API call
      state.rollbackCart = current(state);

      const productId = action.payload;
      state.products = state.products.filter((p) => p.id !== productId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCart.pending, (state) => {
        state.status = "loading"; // Set loading status while API request is in progress
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.status = "succeeded"; // Successful API call
        saveCartToLocalStorage(state); // Save to localStorage on success
        toast.success("Cart updated successfully!");
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.status = "failed";
        // Rollback to the previous cart state
        state.products = current(state.rollbackCart.products);

        toast.error("Failed to update cart.");
      });
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
