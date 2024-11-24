import React, { useContext } from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { FaShoppingCart } from "react-icons/fa"; // React icon for empty cart

const CartPage = () => {
  const { theme } = useContext(ThemeContext); // Access theme from context
  const cartProducts = useSelector((state) => state.cart.products);

  return (
    <div
      className={`p-6 min-h-[calc(100vh-3.5rem)] flex flex-col items-center ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1
        className={`text-3xl font-bold mb-6 ${
          theme === "dark" ? "text-orange-400" : "text-orange-600"
        }`}
      >
        My Cart
      </h1>
      {cartProducts.length === 0 ? (
        <div className="text-center flex flex-col items-center">
          <FaShoppingCart
            className={`mb-4 text-6xl ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <p className="text-lg mb-2">Your cart is empty right now.</p>
          <p className="text-lg">
            You can go to{" "}
            <Link
              to="/products"
              className={`font-bold ${
                theme === "dark" ? "text-orange-400" : "text-orange-600"
              }`}
            >
              Products
            </Link>{" "}
            and start shopping.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
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
