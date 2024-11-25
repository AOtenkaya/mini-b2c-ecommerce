import React, { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import ProductList from "@/components/ProductList";
import ProductFilter from "@/components/ProductFilter";
import { fetchProducts } from "@/store/slices/productSlice";
import { ThemeContext } from "@/context/ThemeContext";
import { getThemeClasses } from "@/utils/themeUtils"; // Import centralized theming utility

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const themeClasses = getThemeClasses(theme); // Get theme-based classes

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={`p-6 min-h-screen ${themeClasses.textColor}`}>
      <div className="container mx-auto py-6 flex flex-col md:flex-row gap-6">
        <aside className={`w-full md:w-1/4 p-4 h-fit`}>
          <ProductFilter />
        </aside>
        <main className={`w-full md:w-3/4 p-4 rounded-lg`}>
          <ProductList />
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
