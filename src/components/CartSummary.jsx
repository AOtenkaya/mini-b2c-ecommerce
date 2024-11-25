import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "@/context/ThemeContext";
import { formatPrice } from "@/utils/formatPrice";
import { getThemeClasses } from "@/utils/themeUtils"; // Importing the utility for centralized theming

const CartSummary = () => {
  const { theme } = useContext(ThemeContext);
  const cartProducts = useSelector((state) => state.cart.products);

  const totalPrice = cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Centralized theming logic
  const themeClasses = getThemeClasses(theme);

  return (
    <div
      className={`h-fit p-4 rounded-lg shadow-md ${themeClasses.cardBackground}`}
    >
      <h2
        className={`text-xl font-semibold mb-4 ${themeClasses.orangeTextColor}`}
      >
        Cart Summary
      </h2>
      <div className="flex justify-between mb-2">
        <span>Total Items:</span>
        <span>{cartProducts.length}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>Total Price:</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
    </div>
  );
};

export default CartSummary;
