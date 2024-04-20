import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export const cartThunks = {
  addToCart: createAsyncThunk(
    "cart/addToCart",
    async ({ productId, quantity = 1, price }, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/cart/add",
          {
            productId,
            quantity,
            price,
          }
        );
        if (data.success) {
          message.success(data.message);
          return data.cart;
        }
      } catch (error) {
        console.error(
          "Error adding product to cart:",
          error.response.data.message
        );
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  fetchCartItems: createAsyncThunk(
    "cart/fetchCartItems",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/cart");
        if (data.success) {
          return data.cart;
        }
      } catch (error) {
        console.error("Error fetching cart:", error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  updateQuantity: createAsyncThunk(
    "cart/updateQuantity",
    async ({ productId, quantity, price }, { rejectWithValue }) => {
      try {
        const { data } = await axios.put(
          `http://localhost:5000/api/cart/update`,
          {
            productId,
            quantity,
            price,
          }
        );
        if (data.success) {
          message.success(data.message);
          return data.cart;
        }
      } catch (error) {
        console.error("Error updating quantity:", error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  deleteCartItem: createAsyncThunk(
    "cart/deleteCartItem",
    async (itemId, { rejectWithValue }) => {
      try {
        const { data } = await axios.delete(
          `http://localhost:5000/api/cart/remove/${itemId}`
        );
        if (data.success) {
          message.success(data.message);
          return data.cart;
        }
      } catch (error) {
        console.error("Error deleting product:", error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  applyCoupon: createAsyncThunk(
    "cart/applyCoupon",
    async (couponCode, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(
          `http://localhost:5000/api/coupon/apply-coupon`,
          {
            couponCode,
          }
        );
        if (data.success) {
          return data.cart;
        }
      } catch (error) {
        console.error("Error applying coupon:", error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  handlePayment: createAsyncThunk(
    "cart/handlePayment",
    async (
      { nonce, amount, products, shipping_address, navigate },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.post(
          `http://localhost:5000/api/checkout/payment`,
          {
            nonce,
            amount,
            products,
            shipping_address,
          }
        );
        if (data.success) {
          message.success(data.message);
          navigate("/order-confirmed");
          return data.cart;
        }
      } catch (error) {
        console.error("Error handling payment:", error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  getCount: createAsyncThunk("cart/getCount", async ({ rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/cart");
      if (data.success) {
        return data.cart;
      }
    } catch (error) {
      console.error("Error fetching cart:", error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }),
};

export const useCartEffect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartThunks.fetchCartItems());
  }, [dispatch]);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cartThunks.addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(cartThunks.addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(cartThunks.addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(cartThunks.deleteCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(cartThunks.deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(cartThunks.deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(cartThunks.fetchCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(cartThunks.fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(cartThunks.fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // message.error(action.payload);
      })
      .addCase(cartThunks.updateQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(cartThunks.updateQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(cartThunks.updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(cartThunks.applyCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(cartThunks.applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(cartThunks.applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(cartThunks.handlePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(cartThunks.handlePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(cartThunks.handlePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(cartThunks.getCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(cartThunks.getCount.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(cartThunks.getCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // message.error(action.payload);
      });
  },
});

export const { refreshCart } = cartSlice.actions;

export default cartSlice.reducer;
