import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryFilter, setSearchText } from "../state/slices/productSlice";
import { getCategories } from "../services/api";

const ProductFilter = () => {
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

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(setSearchText(searchValue));
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [searchValue, dispatch]);

  const handleCategorySelect = (category) => {
    if (categoryFilter === category) return;
    dispatch(setCategoryFilter(category));
  };

  const clearSearchText = () => {
    setSearchValue("");
    dispatch(setSearchText(""));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      {/* Search Input */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchValue && (
          <button
            onClick={clearSearchText}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
          >
            &#x2715;
          </button>
        )}
      </div>

      {/* Category List */}
      <ul>
        <li
          className={`cursor-pointer mb-2 ${
            !categoryFilter ? "font-bold text-blue-600" : ""
          }`}
          onClick={() => handleCategorySelect(null)}
        >
          All Categories
        </li>
        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer hover:text-blue-600 mb-2 ${
              categoryFilter === category ? "font-bold text-blue-600" : ""
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
