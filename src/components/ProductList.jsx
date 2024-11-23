import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { filteredItems, categoryFilter, searchText, status } = useSelector(
    (state) => state.products
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading products.</div>;
  }

  const getFilterMessage = () => {
    if (!searchText && !categoryFilter) {
      return null;
    }

    if (filteredItems.length === 0) {
      if (categoryFilter && searchText) {
        return `We couldn't find any product for "${searchText}" inside the "${categoryFilter}" category.`;
      } else if (categoryFilter) {
        return `We couldn't find any product inside the "${categoryFilter}" category.`;
      } else if (searchText) {
        return `We couldn't find any product for "${searchText}".`;
      }
    } else {
      if (categoryFilter && searchText) {
        return `For the search "${searchText}" inside the "${categoryFilter}" category, we found ${filteredItems.length} item(s).`;
      } else if (categoryFilter) {
        return `Inside the "${categoryFilter}" category, we found ${filteredItems.length} item(s).`;
      } else if (searchText) {
        return `For the search "${searchText}", we found ${filteredItems.length} item(s).`;
      }
    }
  };

  return (
    <div>
      {/* Conditional Filter Message */}
      {getFilterMessage() && (
        <p className="mb-6 text-gray-600">{getFilterMessage()}</p>
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
