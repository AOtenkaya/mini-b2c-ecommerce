import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateCartOnServer } from "../../services/api";
import { toast } from "react-toastify";

const initialState = {
  id: 1,
  userId: 1,
  products: [],
};

// Helper functions to manage localStorage
const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : initialState;
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Create async thunk to update the cart on the server
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (cart, { rejectWithValue }) => {
    try {
      const response = await updateCartOnServer(cart);
      return response; // Return the successful response data
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
      const newProduct = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === newProduct.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...newProduct, quantity: 1 });
      }

      // Automatically sync with server after cart update, handled by middleware
    },

    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter((p) => p.id !== productId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        console.log("fullfilled action", action);
        state.status = "succeeded";
        saveCartToLocalStorage(state); // Save to localStorage on successful sync
        toast.success("Cart updated successfully!");
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload || "Failed to update cart.");
      });
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
