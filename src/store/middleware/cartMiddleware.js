// src/state/middleware/cartMiddleware.js

import { updateCart } from "../slices/cartSlice"; // The async thunk to sync cart with the server

const cartMiddleware = (store) => (next) => (action) => {
  // Call the reducer first
  let result = next(action);

  // Check if the action is one of the cart actions
  if (
    action.type === "cart/addToCart" ||
    action.type === "cart/increaseQuantity" ||
    action.type === "cart/decreaseQuantity" ||
    action.type === "cart/removeFromCart"
  ) {
    // Once the action is processed, dispatch the async updateCart action
    store.dispatch(updateCart(store.getState().cart)); // Update the cart on the server with the latest cart state
  }

  return result;
};

export default cartMiddleware;
