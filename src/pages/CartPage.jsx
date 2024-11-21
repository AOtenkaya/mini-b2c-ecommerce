import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-6">
        <h1 className="text-4xl font-bold mb-6">Your Cart</h1>
        <div className="grid gap-6">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <CartSummary />
      </div>
    </div>
  );
};

export default CartPage;
