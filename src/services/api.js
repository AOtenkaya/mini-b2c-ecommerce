import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
});

const handleError = (error) => {
  if (error.response) {
    console.error("Response error:", error.response);
    throw new Error(
      `API Error: ${error.response.data.message || error.response.statusText}`
    );
  } else if (error.request) {
    console.error("Request error:", error.request);
    throw new Error("API Error: No response from server");
  } else {
    console.error("Error:", error.message);
    throw new Error(`API Error: ${error.message}`);
  }
};

export const fetchProductsAPI = async (searchQuery = "") => {
  try {
    const response = await axiosInstance.get(`/products`, {
      params: { search: searchQuery },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchProductDetailAPI = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get(`/products/categories`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateCartOnServer = async (cart) => {
  // interestingly even the cart we sent here is a proxy object just like on cartSlice we don't need to convert to object
  // with current on slice or stringifying here because axios itself converts it with JSON.stringify
  try {
    const response = await axiosInstance.put(`/carts/1`, cart);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
