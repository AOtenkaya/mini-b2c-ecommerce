import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "@/context/ThemeContext";

const CartSummary = () => {
  const { theme } = useContext(ThemeContext);
  const cartProducts = useSelector((state) => state.cart.products);

  const totalPrice = cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const themeStyles = {
    backgroundColor:
      theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800",
    titleColor: theme === "dark" ? "text-orange-400" : "text-orange-600",
  };

  return (
    <div
      className={`h-fit p-4 rounded-lg shadow-md ${themeStyles.backgroundColor}`}
    >
      <h2 className={`text-xl font-semibold mb-4 ${themeStyles.titleColor}`}>
        Cart Summary
      </h2>
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
