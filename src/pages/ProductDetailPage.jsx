import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetailAPI } from "../services/api"; // Your API method for fetching product by ID
import { useDispatch } from "react-redux";
import { addToCart } from "../state/slices/cartSlice";

const ProductPage = () => {
  const { id } = useParams(); // Get the dynamic "id" from the URL
  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();

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

  if (!product) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
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
          <h1 className="text-3xl font-semibold text-gray-800">
            {product.title}
          </h1>
          <p className="mt-2 text-lg text-gray-500">{product.description}</p>

          <div className="mt-6">
            <p className="text-2xl font-bold text-gray-900">${product.price}</p>
            <p className="text-sm text-gray-600 mt-2">
              In Stock: {product.stock}
            </p>
          </div>

          {/* Add to Cart Section */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Optional: Product Specifications or Additional Info */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">
          Product Specifications
        </h2>
        <ul className="mt-4 space-y-3">
          <li className="text-gray-600">
            <strong>Brand:</strong> {product.brand}
          </li>
          <li className="text-gray-600">
            <strong>Color:</strong> {product.color}
          </li>
          <li className="text-gray-600">
            <strong>Material:</strong> {product.material}
          </li>
          {/* Add more product specs if available */}
        </ul>
      </div>
    </div>
  );
};

export default ProductPage;
