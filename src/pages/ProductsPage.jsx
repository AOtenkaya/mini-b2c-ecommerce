import React, { useEffect, useContext, useMemo } from "react";
import { useDispatch } from "react-redux";
import ProductList from "@/components/ProductList";
import ProductFilter from "@/components/ProductFilter";
import { fetchProducts } from "@/store/slices/productSlice";
import { ThemeContext } from "@/context/ThemeContext";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const themeClasses = useMemo(() => {
    return {
      bgColor: theme === "dark" ? "bg-gray-900" : "bg-gray-100",
      textColor: theme === "dark" ? "text-white" : "text-gray-900",
      headingColor: theme === "dark" ? "text-orange-400" : "text-orange-600",
    };
  }, [theme]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div
      className={`p-6 min-h-screen ${themeClasses.bgColor} ${themeClasses.textColor}`}
    >
      <div className="container mx-auto py-6 flex flex-col md:flex-row gap-6">
        <aside
          className={`w-full md:w-1/4 p-4 ${themeClasses.bgColor} rounded-lg shadow-lg`}
        >
          <ProductFilter />
        </aside>
        <main
          className={`w-full md:w-3/4 p-4 ${themeClasses.bgColor} rounded-lg shadow-lg`}
        >
          <h1
            className={`text-4xl font-bold mb-6 ${themeClasses.headingColor}`}
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
