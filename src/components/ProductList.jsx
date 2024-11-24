import React, { useEffect, useMemo, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeContext } from "@/context/ThemeContext"; // Import ThemeContext for theming
import { fetchProducts } from "@/store/slices/productSlice";
import ProductCard from "./ProductCard";
import Loader from "./shared/Loader"; // Path to your Loader component

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

  const filterMessage = useMemo(() => {
    const itemCount = filteredItems.length;
    const searchTextExists = searchText.trim().length > 0;
    const categoryFilterExists =
      categoryFilter && categoryFilter.trim().length > 0;

    switch (true) {
      case itemCount === 0 && categoryFilterExists && searchTextExists:
        return `We couldn't find any product for "${searchText}" inside the "${categoryFilter}" category.`;
      case itemCount === 0 && categoryFilterExists:
        return `We couldn't find any product inside the "${categoryFilter}" category.`;
      case itemCount === 0 && searchTextExists:
        return `We couldn't find any product for "${searchText}".`;
      case itemCount > 0 && categoryFilterExists && searchTextExists:
        return `For the search "${searchText}" inside the "${categoryFilter}" category, we found ${itemCount} item(s).`;
      case itemCount > 0 && categoryFilterExists:
        return `Inside the "${categoryFilter}" category, we found ${itemCount} item(s).`;
      case itemCount > 0 && searchTextExists:
        return `For the search "${searchText}", we found ${itemCount} item(s).`;
      default:
        return null;
    }
  }, [filteredItems, searchText, categoryFilter]);

  if (status === "loading") {
    return <Loader message="Fetching product details, please wait..." />;
  }

  if (status === "failed") {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const themeStyles = {
    filterMessage: theme === "dark" ? "text-gray-300" : "text-gray-600",
  };

  return (
    <div>
      {/* Conditional Filter Message with theming */}
      {filterMessage && (
        <p className={`mb-6 ${themeStyles.filterMessage}`}>{filterMessage}</p>
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
