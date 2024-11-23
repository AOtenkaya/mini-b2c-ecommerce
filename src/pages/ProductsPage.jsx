import React, { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import ProductList from "../components/ProductList";
import ProductFilter from "../components/ProductFilter";
import { fetchProducts } from "../state/slices/productSlice";
import { ThemeContext } from "../context/ThemeContext";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext); // Access theme from context

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch all products on initial load
  }, [dispatch]);

  return (
    <div
      className={`p-6 min-h-[calc(100vh-3.5rem)] ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      } min-h-screen`}
    >
      <div className="container mx-auto py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside
          className={`w-full md:w-1/4 p-4 ${
            theme === "dark"
              ? "bg-gray-700 text-white"
              : "bg-white text-gray-900"
          } rounded-lg shadow-lg h-fit`}
        >
          <ProductFilter />
        </aside>

        {/* Product List */}
        <main
          className={`w-full md:w-3/4 p-4 ${
            theme === "dark" ? "bg-gray-700" : "bg-white"
          } rounded-lg shadow-lg`}
        >
          <h1
            className={`text-4xl font-bold mb-6 ${
              theme === "dark" ? "text-orange-400" : "text-orange-600"
            }`}
          >
            Our Products
          </h1>
          <ProductList />
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
