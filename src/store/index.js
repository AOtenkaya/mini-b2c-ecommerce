// src/state/index.js

import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import cartMiddleware from "./middleware/cartMiddleware"; // Import your custom middleware

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware), // Apply the custom cartMiddleware
});

export default store;
