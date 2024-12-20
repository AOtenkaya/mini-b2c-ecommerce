import React, {
  useContext,
  useCallback,
  Suspense,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { ThemeContext } from "@/context/ThemeContext";
import { createResource } from "@/utils/createResource";
import { fetchProductDetailAPI } from "@/services/api";
import Loader from "@/components/shared/Loader";
import ProductDetails from "@/components/ProductDetails";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const productResource = useMemo(() => {
    return createResource(async () => {
      try {
        const product = await fetchProductDetailAPI(id);
        return product;
      } catch (err) {
        setError("Failed to fetch product details. Please try again later.");
        throw err;
      }
    });
  }, [id]);

  // this method is not an expensive method but since we send it as prop even though
  // we dont have any re-render logic here we still can use useCallback for the methods we send as prop
  const handleAddToCart = useCallback(
    (product) => {
      dispatch(addToCart(product));
    },
    [dispatch] // `dispatch` is the dependency, it won't change between renders
  );

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } max-w-screen-xl mx-auto rounded-lg p-6 mt-6`}
    >
      <Suspense
        fallback={<Loader message="Fetching product details, please wait..." />}
      >
        <ProductDetails
          productResource={productResource}
          onAddToCart={handleAddToCart}
        />
      </Suspense>
    </div>
  );
};

export default ProductDetailPage;
