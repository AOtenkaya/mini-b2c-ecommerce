import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext"; // Access theme context
import { getThemeClasses } from "@/utils/themeUtils"; // Import centralized theming utility
import { formatPrice } from "@/utils/formatPrice";

const ProductDetails = ({ productResource, onAddToCart }) => {
  const { theme } = useContext(ThemeContext); // Access current theme context
  const product = productResource.read(); // This suspends until the product is fetched

  // Centralized theming logic
  const themeClasses = getThemeClasses(theme);

  return (
    <>
      <div
        className={`flex flex-col md:flex-row gap-8 h-full rounded-lg ${themeClasses.cardBackground}`}
      >
        {/* Left Section: Product Image Gallery */}
        <div className="flex-1 h-fit">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-h-[500px] object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Right Section: Product Details */}
        <div className="flex-1 p-2">
          <h1 className={`text-3xl font-semibold ${themeClasses.textColor}`}>
            {product.title}
          </h1>
          <p className={`mt-2 text-lg ${themeClasses.secondaryTextColor}`}>
            {product.description}
          </p>

          <div className="mt-6">
            <p className={`text-xl font-bold ${themeClasses.priceColor} mt-2`}>
              {formatPrice(product.price)}
            </p>
            <p className={`text-sm mt-2 ${themeClasses.secondaryTextColor}`}>
              In Stock: {product.stock}
            </p>
          </div>

          {/* Add to Cart Section */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => onAddToCart(product)}
              className={`w-full text-white p-2 rounded-lg transition-colors ${themeClasses.buttonColor}`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Product Specifications Section */}
      <div
        className={`mt-8 p-6 rounded-lg shadow-md ${themeClasses.sectionBackground}`}
      >
        <h2 className={`text-2xl font-semibold ${themeClasses.textColor}`}>
          Product Specifications
        </h2>
        <ul className="mt-4 space-y-3">
          <li className={`text-sm ${themeClasses.secondaryTextColor}`}>
            <strong>Brand:</strong> {product.brand}
          </li>
          <li className={`text-sm ${themeClasses.secondaryTextColor}`}>
            <strong>Color:</strong> {product.color}
          </li>
          <li className={`text-sm ${themeClasses.secondaryTextColor}`}>
            <strong>Material:</strong> {product.material}
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProductDetails;
