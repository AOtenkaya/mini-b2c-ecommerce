import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from "@/context/ThemeContext";
import { getThemeClasses } from "@/utils/themeUtils"; // Importing the utility for centralized theming

const NavigationBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const cartItemsCount = useSelector((state) => state.cart.products.length);
  const location = useLocation();
  const themeClasses = getThemeClasses(theme); // Getting the theme-specific classes from the utility

  return (
    <nav
      className={`sticky top-0 z-50 flex h-14 justify-between items-center px-6 py-4 shadow-md ${themeClasses.sectionBackground}`}
    >
      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className={`flex items-center px-3 py-2 rounded ${themeClasses.themeButton} hover:opacity-80`}
      >
        {theme === "dark" ? (
          <FaSun className={`h-5 w-5 ${themeClasses.themeIcon}`} />
        ) : (
          <FaMoon className={`h-5 w-5 ${themeClasses.themeIcon}`} />
        )}
      </button>

      {/* Navigation links */}
      <div className="flex space-x-4">
        {location.pathname !== "/" && (
          <Link
            to="/"
            className={`${themeClasses.themeButton} px-4 py-2 rounded-lg font-medium shadow hover:opacity-90 transition duration-300`}
          >
            Products
          </Link>
        )}

        {location.pathname !== "/cart" && (
          <Link
            to="/cart"
            className={`${themeClasses.themeButton} px-4 py-2 rounded-lg font-medium shadow hover:opacity-90 transition duration-300 relative flex items-center space-x-2`}
          >
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m15-8a3 3 0 11-6 0 3 3 0 016 0zm-4.5 0h-5"
                />
              </svg>
              {cartItemsCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-orange-500 text-white text-sm font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  title="Items in Cart"
                >
                  {cartItemsCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
