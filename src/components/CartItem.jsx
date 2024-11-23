import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../store/slices/cartSlice";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { FaTrash } from "react-icons/fa";

const CartItem = React.memo(({ item }) => {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const handleIncrease = () => {
    dispatch(increaseQuantity(item.id));
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item.id));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const themeStyles = {
    buttonColor:
      theme === "dark"
        ? "text-orange-500 hover:bg-gray-700"
        : "text-orange-600 hover:bg-gray-100",
    backgroundColor:
      theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900",
    borderColor: theme === "dark" ? "border-gray-700" : "border-gray-300",
  };

  return (
    <div
      className={`flex items-center justify-between ${themeStyles.backgroundColor} p-4 rounded-lg shadow-md mb-4`}
    >
      <div className="flex items-center space-x-4 w-fit">
        <img
          src={item.image}
          alt={item.title}
          className="w-16 h-16 object-fill rounded-md"
        />
        <div className="flex-1">
          <Link to={`/products/${item.id}`} className="block">
            <h2 className="text-lg font-semibold truncate w-full">
              {item.title}
            </h2>
          </Link>

          <p className="text-gray-600">${item.price}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleDecrease}
          className={`rounded-full px-2 py-1 ${themeStyles.buttonColor}`}
        >
          -
        </button>

        <span className="text-lg font-semibold">{item.quantity}</span>

        <button
          onClick={handleIncrease}
          className={`rounded-full px-2 py-1 ${themeStyles.buttonColor}`}
        >
          +
        </button>

        <button onClick={handleRemove} className="relative group text-xl">
          <FaTrash className={themeStyles.buttonColor} />
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Delete from cart
          </span>
        </button>
      </div>
    </div>
  );
});

export default CartItem;
