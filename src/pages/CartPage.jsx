import React, { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import { ThemeContext } from "@/context/ThemeContext";
import { getThemeClasses } from "@/utils/themeUtils"; // Import centralized theming utility

const CartPage = () => {
  const { theme } = useContext(ThemeContext); // Get current theme
  const cartProducts = useSelector((state) => state.cart.products);

  const cartProductsLength = useMemo(() => cartProducts.length, [cartProducts]);

  const themeClasses = useMemo(() => getThemeClasses(theme), [theme]);

  return (
    <div
      className={`p-6 min-h-[calc(100vh-3.5rem)] flex flex-col items-center ${themeClasses.darkerBgColor} ${themeClasses.textColor}`}
    >
      <h1 className={`text-3xl font-bold mb-6 ${themeClasses.orangeTextColor}`}>
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
            <Link
              to="/"
              className={`font-bold ${themeClasses.orangeTextColor}`}
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
