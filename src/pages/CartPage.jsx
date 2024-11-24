import React, { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import { ThemeContext } from "@/context/ThemeContext";

const CartPage = () => {
  const { theme } = useContext(ThemeContext);
  const cartProducts = useSelector((state) => state.cart.products);

  const cartProductsLength = useMemo(() => cartProducts.length, [cartProducts]);

  const themeClasses = useMemo(() => {
    return {
      bgColor: theme === "dark" ? "bg-gray-900" : "bg-gray-100",
      textColor: theme === "dark" ? "text-white" : "text-gray-900",
      headingColor: theme === "dark" ? "text-orange-400" : "text-orange-600",
      iconColor: theme === "dark" ? "text-gray-400" : "text-gray-500",
      linkColor: theme === "dark" ? "text-orange-400" : "text-orange-600",
    };
  }, [theme]);

  return (
    <div
      className={`p-6 min-h-[calc(100vh-3.5rem)] flex flex-col items-center ${themeClasses.bgColor} ${themeClasses.textColor}`}
    >
      <h1 className={`text-3xl font-bold mb-6 ${themeClasses.headingColor}`}>
        My Cart
      </h1>
      {cartProductsLength === 0 ? (
        <div className="text-center flex flex-col items-center">
          <FaShoppingCart
            className={`mb-4 text-6xl ${themeClasses.iconColor}`}
          />
          <p className="text-lg mb-2">Your cart is empty right now.</p>
          <p className="text-lg">
            You can go to{" "}
            <Link to="/" className={`font-bold ${themeClasses.linkColor}`}>
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
