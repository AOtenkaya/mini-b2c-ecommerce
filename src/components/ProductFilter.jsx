import React, { useState, useEffect, useContext, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryFilter, setSearchText } from "../store/slices/productSlice";
import { ThemeContext } from "@/context/ThemeContext";
import { getCategories } from "@/services/api"; // Assuming getCategories is your API function
import { createResource } from "@/utils/createResource";
import Loader from "./shared/Loader"; // Path to your Loader component
import { getThemeClasses } from "@/utils/themeUtils"; // Import centralized theming utility

// Wrap getCategories with createResource
const categoryResource = createResource(getCategories);

const ProductFilter = () => {
  const { theme } = useContext(ThemeContext); // Access theme from context
  const dispatch = useDispatch();
  const { categoryFilter, searchText } = useSelector((state) => state.products);
  const [searchValue, setSearchValue] = useState(searchText);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(setSearchText(searchValue));
    }
  };

  const handleCategorySelect = (category) => {
    if (categoryFilter === category) return;
    dispatch(setCategoryFilter(category));
  };

  const clearSearchText = () => {
    setSearchValue("");
    dispatch(setSearchText(""));
  };

  const categories = categoryResource.read(); // This will suspend if categories are not ready

  useEffect(() => {
    // Clear filters when the component unmounts or on route change
    return () => {
      dispatch(setSearchText(""));
      dispatch(setCategoryFilter(null));
    };
  }, [dispatch]);

  // Centralized theming logic
  const themeClasses = getThemeClasses(theme);

  return (
    <div
      className={`shadow-md rounded-lg p-4 h-fit ${themeClasses.cardBackground}`}
    >
      <h2 className={`text-lg font-bold mb-4 ${themeClasses.orangeTextColor}`}>
        Filters
      </h2>

      {/* Search Input */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown} // Trigger filtering on Enter key
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${themeClasses.input}`}
        />
        {searchValue && (
          <button
            onClick={clearSearchText}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.buttonClear} hover:text-gray-800`}
          >
            &#x2715;
          </button>
        )}
      </div>

      {/* Category List */}
      <Suspense
        fallback={
          <Loader message="Fetching product categories, please wait..." />
        }
      >
        <ul>
          <li
            className={`cursor-pointer mb-2 ${
              !categoryFilter ? `${themeClasses.orangeTextColor} font-bold` : ""
            }`}
            onClick={() => handleCategorySelect(null)}
          >
            All Categories
          </li>

          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer hover:${
                themeClasses.categoryText
              } mb-2 ${
                categoryFilter === category ? themeClasses.categorySelected : ""
              } `}
              onClick={() => handleCategorySelect(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
};

export default ProductFilter;
