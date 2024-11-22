import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductList from "../components/ProductList";
import ProductFilter from "../components/ProductFilter";
import { fetchProducts } from "../state/slices/productSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch all products on initial load
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4">
          <ProductFilter />
        </aside>
        {/* Product List */}
        <main className="w-full md:w-3/4">
          <h1 className="text-4xl font-bold mb-6 px-6">Our Products</h1>
          <ProductList />
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
