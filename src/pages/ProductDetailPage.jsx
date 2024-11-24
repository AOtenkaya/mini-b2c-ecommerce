import React, { useContext, Suspense, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { ThemeContext } from "../context/ThemeContext";
import { createResource } from "../utils/createResource"; // Import createResource utility
import { fetchProductDetailAPI } from "../services/api";
import Loader from "../components/shared/Loader"; // Path to your Loader component
import ProductDetails from "../components/ProductDetails"; // Import the newly created ProductDetails component

const ProductDetailPage = () => {
  const { id } = useParams(); // Get the dynamic "id" from the URL
  const { theme } = useContext(ThemeContext); // Access current theme
  const dispatch = useDispatch();

  // Create a resource for fetching the product by ID and memoize to avoid re-fetching on theme change
  const productResource = useMemo(
    () => createResource(() => fetchProductDetailAPI(id)),
    [id] // Only recreate resource if the product id changes
  );

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Add product to cart
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } max-w-screen-xl mx-auto rounded-lg p-6 mt-6`}
    >
      {/* Suspense wrapper while the data is being fetched */}
      <Suspense
        fallback={<Loader message="Fetching product details, please wait..." />}
      >
        <ProductDetails
          productResource={productResource} // Pass the product resource to ProductDetails
          onAddToCart={handleAddToCart}
        />
      </Suspense>
    </div>
  );
};

export default ProductDetailPage;
