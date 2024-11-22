// src/components/CartSummary.jsx
import React from "react";
import { useSelector } from "react-redux";

const CartSummary = () => {
  const cartProducts = useSelector((state) => state.cart.products);

  const totalPrice = cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white h-fit p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Total Items:</span>
        <span>{cartProducts.length}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>Total Price:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartSummary;
