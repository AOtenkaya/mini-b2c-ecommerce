import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
});

// Error handling function
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

export const fetchProducts = async (searchQuery = "") => {
  try {
    const response = await axiosInstance.get(`/products`, {
      params: { search: searchQuery },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const addToCart = async (product) => {
  try {
    const response = await axiosInstance.post(`/cart`, product);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateCartQuantity = async (cartItemId, quantity) => {
  try {
    const response = await axiosInstance.put(`/cart/${cartItemId}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Delete cart item
export const deleteFromCart = async (cartItemId) => {
  try {
    const response = await axiosInstance.delete(`/cart/${cartItemId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
