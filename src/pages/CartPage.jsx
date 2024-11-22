// src/pages/CartPage.jsx
import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

const CartPage = () => {
  const cartProducts = useSelector((state) => state.cart.products);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>
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
