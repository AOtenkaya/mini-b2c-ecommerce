import React from "react";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../state/slices/cartSlice";
import { Link } from "react-router-dom";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  // Handle quantity increase
  const handleIncrease = () => {
    dispatch(increaseQuantity(item.id));
  };

  // Handle quantity decrease
  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item.id));
    }
  };

  // Handle item removal
  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center space-x-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-16 h-16 object-scale-down rounded-md"
        />
        <div>
          <Link to={`/products/${item.id}`}>
            <h2 className="text-lg font-semibold truncate">{item.title}</h2>
          </Link>
          <p className="text-gray-600">${item.price}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {/* Quantity Controls */}
        <button
          onClick={handleDecrease}
          className="text-gray-600 bg-gray-200 rounded-full px-2 py-1 hover:bg-gray-300"
        >
          -
        </button>
        <span className="text-lg font-semibold">{item.quantity}</span>
        <button
          onClick={handleIncrease}
          className="text-gray-600 bg-gray-200 rounded-full px-2 py-1 hover:bg-gray-300"
        >
          +
        </button>

        {/* Remove Item Button */}
        <button
          onClick={handleRemove}
          className="text-red-600 hover:underline ml-4"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
