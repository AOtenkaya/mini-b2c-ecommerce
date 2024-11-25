import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { ThemeContext } from "../context/ThemeContext"; // Import ThemeContext
import { getThemeClasses } from "@/utils/themeUtils"; // Import the utility for centralized theming
import { formatPrice } from "@/utils/formatPrice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext); // Access the current theme

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  // Centralized theming logic
  const themeClasses = getThemeClasses(theme);

  return (
    <div
      className={`group ${themeClasses.cardBackground} rounded-lg shadow-lg p-4 hover:shadow-2xl transition-all`}
    >
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-fill rounded-lg"
        />

        <div className="mt-4">
          <h3
            className={`${themeClasses.titleColor} text-lg font-semibold truncate`}
          >
            {product.title}
          </h3>

          <p className={`${themeClasses.priceColor} mt-2 text-md font-bold`}>
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>

      {/* Button */}
      <button
        onClick={handleAddToCart}
        className={`group-hover:visible mt-4 w-full text-white p-2 rounded-lg transition-colors visible lg:invisible ${themeClasses.buttonColor}`}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
