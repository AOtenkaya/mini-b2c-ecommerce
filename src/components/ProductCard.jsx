// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../state/slices/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-scale-down rounded-lg"
      />

      <div className="mt-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold truncate">{product.title}</h3>
        </Link>

        <p className="text-gray-600 mt-2">${product.price}</p>

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
