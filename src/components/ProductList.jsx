import React, { useMemo, useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "@/context/ThemeContext"; // Import ThemeContext for theming
import ProductCard from "./ProductCard";
import Loader from "./shared/Loader"; // Path to your Loader component
import { getThemeClasses } from "@/utils/themeUtils"; // Import the centralized theming utility

const ProductList = () => {
  const { filteredItems, status, error, searchText, categoryFilter } =
    useSelector((state) => state.products);
  const { theme } = useContext(ThemeContext); // Access theme from context

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
    return <Loader message="Fetching product list, please wait..." />;
  }

  if (status === "failed") {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const themeClasses = getThemeClasses(theme);

  return (
    <div>
      {filterMessage && (
        <p className={`mb-6 font-bold ${themeClasses.textColor}`}>
          {filterMessage}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-3">
        {filteredItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
