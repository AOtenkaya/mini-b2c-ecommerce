import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsAPI } from "../../services/api";

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const response = await fetchProductsAPI();
  return response;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filteredItems: [],
    categoryFilter: "",
    searchText: "",
    status: "idle",
    error: null,
  },
  reducers: {
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
      state.filteredItems = filterProducts(
        state.items,
        state.searchText,
        state.categoryFilter
      );
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
      state.filteredItems = filterProducts(
        state.items,
        state.searchText,
        state.categoryFilter
      );
    },
    clearFilters: (state) => {
      state.categoryFilter = "";
      state.searchText = "";
      state.filteredItems = [...state.items];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.filteredItems = filterProducts(
          action.payload,
          state.searchText,
          state.categoryFilter
        );
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const filterProducts = (products, searchText, categoryFilter) => {
  return products.filter((product) => {
    const matchesCategory =
      !categoryFilter ||
      product.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch =
      !searchText ||
      product.title.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });
};

export const { setCategoryFilter, setSearchText, clearFilters } =
  productSlice.actions;
export default productSlice.reducer;
