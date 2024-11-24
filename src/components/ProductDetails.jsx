import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext"; // Access theme context

const ProductDetails = ({ productResource, onAddToCart }) => {
  const { theme } = useContext(ThemeContext); // Access current theme context
  const product = productResource.read(); // This suspends until the product is fetched

  const themeStyles = {
    cardBackground:
      theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900",
    textColor: theme === "dark" ? "text-white" : "text-gray-800",
    secondaryTextColor: theme === "dark" ? "text-gray-300" : "text-gray-500",
    priceColor: theme === "dark" ? "text-green-400" : "text-green-600",
    buttonBackground:
      theme === "dark"
        ? "bg-orange-500 hover:bg-orange-600"
        : "bg-orange-500 hover:bg-orange-600",
    sectionBackground:
      theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900",
  };

  return (
    <>
      <div
        className={`flex flex-col md:flex-row gap-8 h-full ${themeStyles.cardBackground}`}
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
        <div className="flex-1">
          <h1 className={`text-3xl font-semibold ${themeStyles.textColor}`}>
            {product.title}
          </h1>
          <p className={`mt-2 text-lg ${themeStyles.secondaryTextColor}`}>
            {product.description}
          </p>

          <div className="mt-6">
            <p className={`text-xl font-bold ${themeStyles.priceColor} mt-2`}>
              ${product.price}
            </p>
            <p className={`text-sm mt-2 ${themeStyles.secondaryTextColor}`}>
              In Stock: {product.stock}
            </p>
          </div>

          {/* Add to Cart Section */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => onAddToCart(product)}
              className={`w-full text-white p-2 rounded-lg transition-colors ${themeStyles.buttonBackground}`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Product Specifications Section */}
      <div
        className={`mt-8 p-6 rounded-lg shadow-md ${themeStyles.sectionBackground}`}
      >
        <h2 className={`text-2xl font-semibold ${themeStyles.textColor}`}>
          Product Specifications
        </h2>
        <ul className="mt-4 space-y-3">
          <li className={`text-sm ${themeStyles.secondaryTextColor}`}>
            <strong>Brand:</strong> {product.brand}
          </li>
          <li className={`text-sm ${themeStyles.secondaryTextColor}`}>
            <strong>Color:</strong> {product.color}
          </li>
          <li className={`text-sm ${themeStyles.secondaryTextColor}`}>
            <strong>Material:</strong> {product.material}
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProductDetails;
