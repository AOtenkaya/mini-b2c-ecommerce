import React, { useEffect, useMemo, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";
import ProductCard from "./ProductCard";
import Loader from "./shared/Loader"; // Path to your Loader component
import { ThemeContext } from "../context/ThemeContext"; // Import ThemeContext for theming

const ProductList = () => {
  const dispatch = useDispatch();
  const { filteredItems, status, error, searchText, categoryFilter } =
    useSelector((state) => state.products);
  const { theme } = useContext(ThemeContext); // Access theme from context

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // Memoizing the filter message logic
  const filterMessage = useMemo(() => {
    if (!searchText && !categoryFilter) {
      return null; // No filter applied
    }

    // Handle case when no items match the filter
    if (filteredItems.length === 0) {
      if (categoryFilter && searchText) {
        return `We couldn't find any product for ${searchText} inside the ${categoryFilter} category.`;
      } else if (categoryFilter) {
        return `We couldn't find any product inside the ${categoryFilter} category.`;
      } else if (searchText) {
        return `We couldn't find any product for "${searchText}".`;
      }
    } else {
      // Handle case when there are items that match the filter
      if (categoryFilter && searchText) {
        return `For the search ${searchText} inside the ${categoryFilter} category, we found ${filteredItems.length} item(s).`;
      } else if (categoryFilter) {
        return `Inside the ${categoryFilter} category, we found ${filteredItems.length} item(s).`;
      } else if (searchText) {
        return `For the search ${searchText}, we found ${filteredItems.length} item(s).`;
      }
    }
  }, [filteredItems, searchText, categoryFilter]); // Recalculate if any of these change

  // Early return for loading state, and status failure
  if (status === "loading") {
    return <Loader message="Fetching product details, please wait..." />;
  }

  if (status === "failed") {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      {/* Conditional Filter Message with theming */}
      {filterMessage && (
        <p
          className={`mb-6 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {filterMessage}
        </p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
