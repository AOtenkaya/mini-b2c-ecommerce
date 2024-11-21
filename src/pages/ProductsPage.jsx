import React from "react";
import ProductList from "../components/ProductList";

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-6">
        <h1 className="text-4xl font-bold mb-6">Our Products</h1>
        <ProductList />
      </div>
    </div>
  );
};

export default ProductsPage;
