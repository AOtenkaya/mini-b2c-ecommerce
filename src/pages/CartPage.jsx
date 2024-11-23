import React, { useContext } from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { ThemeContext } from "../context/ThemeContext";

const CartPage = () => {
  const { theme } = useContext(ThemeContext); // Access theme from context
  const cartProducts = useSelector((state) => state.cart.products);

  return (
    <div
      className={`p-6 min-h-[calc(100vh-3.5rem)] ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1
        className={`text-3xl font-bold mb-4 ${
          theme === "dark" ? "text-orange-400" : "text-orange-600"
        }`}
      >
        Your Shopping Cart
      </h1>
      {cartProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartProducts.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          {/* Cart Summary */}
          <CartSummary />
        </div>
      )}
    </div>
  );
};

export default CartPage;
