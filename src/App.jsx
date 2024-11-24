import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductsPage from "@/pages/ProductsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import Navbar from "@/components/Navbar";
import { ThemeContext } from "@/context/ThemeContext"; // Centralized Theme Context

const App = () => {
  const { theme } = useContext(ThemeContext); // Destructuring to get theme

  const themeClasses =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"; // Centralized theming logic

  return (
    <Router basename={import.meta.env.VITE_APP_BASE_PATH}>
      <div className={`min-h-screen ${themeClasses}`}>
        {" "}
        {/* Simplified theme application */}
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        {/* Toast Container with Dynamic Theme */}
        <ToastContainer
          theme={theme === "dark" ? "dark" : "colored"} // Centralized dynamic theme for toast
          position="top-left"
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
