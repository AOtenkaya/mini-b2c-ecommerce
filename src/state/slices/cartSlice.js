import { createSlice } from "@reduxjs/toolkit";

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

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(), // Load cart from localStorage initially
  reducers: {
    // Add product to cart
    addToCart: (state, action) => {
      const newProduct = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === newProduct.id
      );

      if (existingProduct) {
        // If the product exists, just increase the quantity
        existingProduct.quantity += 1;
      } else {
        // Otherwise, add the new product to the cart with quantity 1
        state.products.push({ ...newProduct, quantity: 1 });
      }

      // Save updated cart to localStorage
      saveCartToLocalStorage(state);
    },

    // Increase quantity of a specific product in the cart
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.quantity += 1;
        saveCartToLocalStorage(state); // Save after quantity change
      }
    },

    // Decrease quantity of a specific product in the cart
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        saveCartToLocalStorage(state); // Save after quantity change
      }
    },

    // Remove product from the cart
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter((p) => p.id !== productId);
      saveCartToLocalStorage(state); // Save after removal
    },

    // Clear entire cart
    clearCart: (state) => {
      state.products = [];
      saveCartToLocalStorage(state); // Save after clearing
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
