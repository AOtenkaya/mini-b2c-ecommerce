import React, { useContext } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductsPage from "@/pages/ProductsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import NavigationBar from "@/components/NavigationBar";
import { ThemeContext } from "@/context/ThemeContext"; // Centralized Theme Context
import { getThemeClasses } from "@/utils/themeUtils"; // Importing the utility for centralized theming

const App = () => {
  const { theme } = useContext(ThemeContext); // Destructuring to get theme

  const themeClasses = getThemeClasses(theme); // Getting the theme-specific classes from the utility

  return (
    <Router>
      <div
        className={`min-h-screen ${themeClasses.darkerBgColor} ${themeClasses.textColor}`}
      >
        <NavigationBar />
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <ToastContainer
          className={"!top-12"}
          theme={theme === "dark" ? "dark" : "colored"} // Toast theme based on current theme
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
};

export default App;
