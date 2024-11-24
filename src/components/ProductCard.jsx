import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { ThemeContext } from "../context/ThemeContext"; // Import ThemeContext

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext); // Access the current theme

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const themeStyles = {
    cardBackground:
      theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900",
    priceColor: theme === "dark" ? "text-green-400" : "text-green-600",
    buttonBackground:
      theme === "dark"
        ? "bg-orange-500 hover:bg-orange-600"
        : "bg-orange-500 hover:bg-orange-600",
    titleColor: theme === "dark" ? "text-white" : "text-gray-900",
  };

  return (
    <div
      className={`group ${themeStyles.cardBackground} rounded-lg shadow-lg p-4 hover:shadow-2xl transition-all`}
    >
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-fill rounded-lg"
        />

        <div className="mt-4">
          <h3
            className={`${themeStyles.titleColor} text-lg font-semibold truncate`}
          >
            {product.title}
          </h3>

          <p className={`${themeStyles.priceColor} mt-2 text-md font-bold`}>
            ${product.price}
          </p>
        </div>
      </Link>

      {/* Button */}
      <button
        onClick={handleAddToCart}
        className={`group-hover:visible mt-4 w-full text-white p-2 rounded-lg transition-colors visible lg:invisible  ${themeStyles.buttonBackground}`}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
