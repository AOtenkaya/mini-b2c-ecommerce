// src/components/CartItem.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { updateCartQuantity, deleteFromCart } from "../state/slices/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      dispatch(
        updateCartQuantity({ cartItemId: item.id, quantity: newQuantity })
      );
    }
  };

  const handleRemoveItem = () => {
    dispatch(deleteFromCart(item.id));
  };

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center">
        <img
          src={item.image}
          alt={item.title}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div className="ml-4">
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-gray-600">${item.price}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="number"
          value={item.quantity}
          min="1"
          onChange={handleQuantityChange}
          className="w-12 p-2 border rounded-md"
        />
        <button
          onClick={handleRemoveItem}
          className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
