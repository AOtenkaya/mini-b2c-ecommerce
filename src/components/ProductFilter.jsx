import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryFilter, setSearchText } from "../state/slices/productSlice";
import { getCategories } from "../services/api";
import { ThemeContext } from "../context/ThemeContext";

const ProductFilter = () => {
  const { theme } = useContext(ThemeContext); // Access theme from context
  const dispatch = useDispatch();
  const { categoryFilter, searchText } = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState(searchText);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryList = await getCategories();
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
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
          className={`${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600 focus:ring-orange-500"
              : "bg-white text-gray-900 border-gray-300 focus:ring-orange-500"
          } w-full p-2 border rounded-md focus:outline-none focus:ring-2`}
        />
        {searchValue && (
          <button
            onClick={clearSearchText}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
              theme === "dark" ? "text-white" : "text-gray-500"
            } hover:text-gray-800`}
          >
            &#x2715;
          </button>
        )}
      </div>

      {/* Category List */}
      <ul>
        <li
          className={`cursor-pointer mb-2 ${
            !categoryFilter
              ? `${
                  theme === "dark" ? "text-orange-400" : "text-orange-600"
                } font-bold`
              : ""
          }`}
          onClick={() => handleCategorySelect(null)}
        >
          All Categories
        </li>

        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer hover:${
              theme === "dark" ? "text-orange-400" : "text-orange-600"
            } mb-2 ${
              categoryFilter === category
                ? `${
                    theme === "dark"
                      ? "font-bold text-orange-400"
                      : "font-bold text-orange-600"
                  }`
                : ""
            }`}
            onClick={() => handleCategorySelect(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductFilter;
