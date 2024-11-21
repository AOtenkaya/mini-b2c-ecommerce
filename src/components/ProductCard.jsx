// src/components/ProductCard.js
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../state/slices/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover rounded-md"
      />
      <div className="mt-4">
        <h3 className="text-xl font-semibold">{product.title}</h3>
        <p className="text-gray-600 mt-2">${product.price}</p>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
