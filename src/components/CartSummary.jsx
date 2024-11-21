import React from "react";
import { useSelector } from "react-redux";

const CartSummary = () => {
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate the total price
  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
      <div className="flex justify-between mb-4">
        <span>Total:</span>
        <span className="font-semibold">${totalPrice}</span>
      </div>
      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
