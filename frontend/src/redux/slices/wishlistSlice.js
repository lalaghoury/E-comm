import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";
import { message } from "antd";
import { useEffect } from "react";

const initialState = {
  data: [],
  loading: false,
  error: null,
  count: 0,
};

export const wishlsitThunks = {
  fetchWishlist: createAsyncThunk(
    "wishlish/fetchWishlist",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/products/user-wishlist"
        );
        if (data.success) {
          return data.products;
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  fetchWishlistCount: createAsyncThunk(
    "wishlish/fetchWishlistCount",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/products/user-wishlist-count"
        );
        if (data.success) {
          return data.count;
        }
      } catch (error) {
        console.error(
          "Error fetching wishlist count:",
          error.response.data.message
        );
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  removeFromWishlist: createAsyncThunk(
    "products/removeFromWishlist",
    async (productId, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(
          `http://localhost:5000/api/products/remove-from-wishlist/${productId}`
        );
        if (data.success) {
          message.success(data.message);
          return productId;
        }
      } catch (error) {
        console.error("Error fetching user:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
};

export const useWishlistEffect = (type) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "count") {
      dispatch(wishlsitThunks.fetchWishlistCount());
    } else {
      dispatch(wishlsitThunks.fetchWishlist());
    }
  }, [dispatch]);
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    updateWishlistCount: (state, action) => {
      state.count = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(wishlsitThunks.fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(wishlsitThunks.fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(wishlsitThunks.fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(wishlsitThunks.fetchWishlistCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(wishlsitThunks.fetchWishlistCount.fulfilled, (state, action) => {
        state.loading = false;
        state.count = action.payload;
      })
      .addCase(wishlsitThunks.fetchWishlistCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(wishlsitThunks.removeFromWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(wishlsitThunks.removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(wishlsitThunks.removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      });
  },
});

export const { updateWishlistCount } = wishlistSlice.actions;

export default wishlistSlice.reducer;
