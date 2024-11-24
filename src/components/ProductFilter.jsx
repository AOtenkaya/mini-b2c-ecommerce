import React, { useState, useContext, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryFilter, setSearchText } from "../store/slices/productSlice";
import { ThemeContext } from "@/context/ThemeContext";
import { getCategories } from "@/services/api"; // Assuming getCategories is your API function
import { createResource } from "@/utils/createResource";
import Loader from "./shared/Loader"; // Path to your Loader component

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

  const themeStyles = {
    input:
      theme === "dark"
        ? "bg-gray-700 text-white border-gray-600"
        : "bg-white text-gray-900 border-gray-300",
    buttonClear: theme === "dark" ? "text-white" : "text-gray-500",
    categoryText: theme === "dark" ? "text-orange-400" : "text-orange-600",
    categorySelected:
      theme === "dark"
        ? "font-bold text-orange-400"
        : "font-bold text-orange-600",
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } shadow-md rounded-lg p-4 h-fit`}
    >
      <h2
        className={`${
          theme === "dark" ? "text-orange-400" : "text-orange-600"
        } text-lg font-bold mb-4`}
      >
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
          className={`${themeStyles.input} w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
        />
        {searchValue && (
          <button
            onClick={clearSearchText}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeStyles.buttonClear} hover:text-gray-800`}
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
              !categoryFilter ? `${themeStyles.categoryText} font-bold` : ""
            }`}
            onClick={() => handleCategorySelect(null)}
          >
            All Categories
          </li>

          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer hover:${
                themeStyles.categoryText
              } mb-2 ${
                categoryFilter === category ? themeStyles.categorySelected : ""
              }`}
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
