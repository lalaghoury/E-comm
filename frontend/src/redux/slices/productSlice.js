import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const productThunks = {
  getAllProducts: createAsyncThunk(
    "products/getAllProducts",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/products/all"
        );
        if (data.success) {
          return data.products;
        }
      } catch (error) {
        console.error("Error fetching products:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  editProduct: createAsyncThunk(
    "products/editProduct",
    async ({ values, productId }, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/edit/${productId}`,
          values
        );
        if (data.success) {
          message.success(data.message);
          return data.updatedProduct;
        }
      } catch (error) {
        console.error("Error Updating Product:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  addProduct: createAsyncThunk(
    "products/addProduct",
    async (values, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/products/new",
          values
        );

        if (data.success) {
          message.success(data.message);
          return data.newProduct;
        }
      } catch (error) {
        console.error("Error Updating Product:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  getProductsByUserWishlists: createAsyncThunk(
    "products/getProductsByUserWishlists",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/products/user-wishlist"
        );
        if (data.success) {
          return data.products;
        }
      } catch (error) {
        console.error("Error fetching user:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  getSearchProducts: createAsyncThunk(
    "products/getSearchProducts",
    async (query, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/filter?query=${query}`
        );
        if (data.success) {
          return data.products;
        }
      } catch (error) {
        console.error("Error fetching user:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
};

export const useProductEffect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productThunks.getAllProducts());
  }, [dispatch]);
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductState: (state, action) => {
      state.data = action.payload.products;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productThunks.getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(productThunks.getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(productThunks.getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(productThunks.editProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(productThunks.editProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload.updatedProduct, ...state.data];
      })
      .addCase(productThunks.editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(productThunks.addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(productThunks.addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload.newProduct, ...state.data];
      })
      .addCase(productThunks.addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(productThunks.getSearchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(productThunks.getSearchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(productThunks.getSearchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      });
  },
});

export const { updateAddressState } = productSlice.actions;

export default productSlice.reducer;
