import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const orderThunks = {
  getOrders: createAsyncThunk(
    "orders/getOrders",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/orders/my-orders");
        if (data.success) {
          return data.orders;
        }
      } catch (error) {
        console.error("Verification failed:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
};

export const useOrderEffect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderThunks.getOrders());
  }, [dispatch]);
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(orderThunks.getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderThunks.getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(orderThunks.getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
