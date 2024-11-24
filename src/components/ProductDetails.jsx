import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"; // Access theme context

const ProductDetails = ({ productResource, onAddToCart }) => {
  const { theme } = useContext(ThemeContext); // Access current theme context

  // Wait until the product resource has been fetched
  const product = productResource.read(); // This suspends until the product is fetched

  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } flex flex-col md:flex-row gap-8 h-full`}
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
          <h1
            className={`${
              theme === "dark" ? "text-white" : "text-gray-800"
            } text-3xl font-semibold`}
          >
            {product.title}
          </h1>
          <p
            className={`${
              theme === "dark" ? "text-gray-300" : "text-gray-500"
            } mt-2 text-lg`}
          >
            {product.description}
          </p>

          <div className="mt-6">
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-900"
              } text-2xl font-bold`}
            >
              ${product.price}
            </p>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              } text-sm mt-2`}
            >
              In Stock: {product.stock}
            </p>
          </div>

          {/* Add to Cart Section */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => onAddToCart(product)}
              className={`${
                theme === "dark"
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-orange-500 hover:bg-orange-600"
              } mt-4 w-full text-white p-2 rounded-lg transition-colors`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Optional: Product Specifications or Additional Info */}
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-700 text-white"
            : "bg-gray-50 text-gray-900"
        } mt-8 p-6 rounded-lg shadow-md`}
      >
        <h2
          className={`${
            theme === "dark" ? "text-white" : "text-gray-800"
          } text-2xl font-semibold`}
        >
          Product Specifications
        </h2>
        <ul className="mt-4 space-y-3">
          <li
            className={`${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <strong>Brand:</strong> {product.brand}
          </li>
          <li
            className={`${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <strong>Color:</strong> {product.color}
          </li>
          <li
            className={`${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <strong>Material:</strong> {product.material}
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProductDetails;
