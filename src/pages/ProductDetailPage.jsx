import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetailAPI } from "../services/api"; // Your API method for fetching product by ID
import { useDispatch } from "react-redux";
import { addToCart } from "../state/slices/cartSlice";
import { ThemeContext } from "../context/ThemeContext"; // Import ThemeContext

const ProductPage = () => {
  const { id } = useParams(); // Get the dynamic "id" from the URL
  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext); // Access current theme

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const fetchedProduct = await fetchProductDetailAPI(id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [id]);

  if (!product)
    return (
      <div className=" min-h-[calc(100vh-3.5rem)] text-center text-xl">
        Loading...
      </div>
    );

  return (
    <div
      className={`min-h-[calc(100vh-3.5rem)] w-full p-6 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } max-w-screen-xl mx-auto rounded-lg p-6`}
      >
        <div
          className={`${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-900"
          } flex flex-col md:flex-row gap-8 h-full`}
        >
          {/* Left Section: Product Image Gallery */}
          <div className="flex-1 h-fit">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[50rem] object-fill rounded-lg shadow-lg"
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
                onClick={handleAddToCart}
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
            {/* Add more product specs if available */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
