import React, { useState, useEffect, useContext, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryFilter, setSearchText } from "../store/slices/productSlice";
import { ThemeContext } from "@/context/ThemeContext";
import { getCategories } from "@/services/api";
import Loader from "./shared/Loader";
import { getThemeClasses } from "@/utils/themeUtils";

const ProductFilter = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { categoryFilter, searchText } = useSelector((state) => state.products);
  const [searchValue, setSearchValue] = useState(searchText);
  const [categoryResource, setCategoryResource] = useState(null);
  const [error, setError] = useState(null);

  // Initialize category resource lazily when the component is mounted
  useEffect(() => {
    let isMounted = true;
    import("react").then(({ startTransition }) => {
      startTransition(() => {
        getCategories()
          .then((categories) => {
            if (isMounted) {
              setCategoryResource(() => ({
                read: () => categories,
              }));
            }
          })
          .catch(() => {
            if (isMounted) {
              setError("Failed to load categories.");
            }
          });
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

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

  const themeClasses = getThemeClasses(theme);

  if (error) {
    return (
      <div className="text-red-500 text-center">
        <p>{error}</p>
      </div>
    );
  }

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
          onKeyDown={handleKeyDown}
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
      {categoryResource ? (
        <Suspense
          fallback={
            <Loader message="Fetching product categories, please wait..." />
          }
        >
          <ul>
            <li
              className={`cursor-pointer mb-2 ${
                !categoryFilter
                  ? `${themeClasses.orangeTextColor} font-bold`
                  : ""
              }`}
              onClick={() => handleCategorySelect(null)}
            >
              All Categories
            </li>
            {categoryResource.read().map((category) => (
              <li
                key={category}
                className={`cursor-pointer hover:${
                  themeClasses.categoryText
                } mb-2 ${
                  categoryFilter === category
                    ? themeClasses.categorySelected
                    : ""
                } `}
                onClick={() => handleCategorySelect(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </li>
            ))}
          </ul>
        </Suspense>
      ) : (
        <Loader message="Loading categories..." />
      )}
    </div>
  );
};

export default ProductFilter;
