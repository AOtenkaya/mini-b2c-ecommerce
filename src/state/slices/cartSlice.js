import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateCartOnServer } from "../../services/api";
import { toast } from "react-toastify";
import { current } from "immer";

// Initial cart state
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
    // Add product to cart
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

      const plainCart = current(state); // Convert proxy to plain object

      // Dispatch updateCart to sync with the server
      updateCartOnServer(state)
        .then(() => {
          saveCartToLocalStorage(plainCart);
          toast.success("Cart updated successfully!");
        })
        .catch(() => {
          console.log("catch");
          toast.error("Failed to update cart.");
        });
    },

    // Increase quantity of a specific product in the cart
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.quantity += 1;
      }

      const plainCart = current(state); // Convert proxy to plain object

      // Dispatch updateCart to sync with the server
      updateCartOnServer(state)
        .then(() => {
          saveCartToLocalStorage(plainCart);
          toast.success("Cart updated successfully!");
        })
        .catch(() => {
          toast.error("Failed to update cart.");
        });
    },

    // Decrease quantity of a specific product in the cart
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }

      const plainCart = current(state); // Convert proxy to plain object

      // Dispatch updateCart to sync with the server
      updateCartOnServer(state)
        .then(() => {
          saveCartToLocalStorage(plainCart);
          toast.success("Cart updated successfully!");
        })
        .catch(() => {
          toast.error("Failed to update cart.");
        });
    },

    // Remove product from the cart
    removeFromCart: (state, action) => {
      const rollbackCart = current(state); // Convert proxy to plain object

      const productId = action.payload;
      state.products = state.products.filter((p) => p.id !== productId);

      const plainCart = current(state); // Convert proxy to plain object

      // Dispatch updateCart to sync with the server
      updateCartOnServer(state)
        .then(() => {
          saveCartToLocalStorage(plainCart);
          toast.success("Cart updated successfully!");
        })
        .catch(() => {
          toast.error("Failed to update cart.");
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Once the cart is updated on the server, save it to localStorage
        saveCartToLocalStorage(state);
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
