import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const addressThunks = {
  addAddress: createAsyncThunk(
    "address/addAddress",
    async (values, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/address/add",
          values
        );
        if (data.success) {
          message.success(data.message);
          return data.address;
        }
      } catch (error) {
        console.error("Error adding product to address:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  deleteAddress: createAsyncThunk(
    "address/deleteAddress",
    async (addressId, { rejectWithValue }) => {
      try {
        const { data } = await axios.delete(
          `http://localhost:5000/api/address/delete`,
          addressId
        );
        if (data.success) {
          message.success(data.message);
          return data.address._id;
        }
      } catch (error) {
        console.error("Error deleting product:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  editAddress: createAsyncThunk(
    "address/editAddress",
    async ({ values, addressId }, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/address/edit`,
          { values, addressId }
        );
        if (data.success) {
          message.success(data.message);
          return data.address;
        }
      } catch (error) {
        console.error("Error fetching address:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  getAddress: createAsyncThunk(
    "address/getAddress",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/address");
        if (data.success) {
          return data.addresses;
        }
      } catch (error) {
        console.error("Error fetching address:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
};

export const useAddressEffect = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addressThunks.getAddress());
  }, [dispatch]);
};

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    updateAddressState: () => {
      addressThunks.getAddress();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addressThunks.addAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(addressThunks.addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload, ...state.data];
      })
      .addCase(addressThunks.addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(addressThunks.deleteAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(addressThunks.deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (address) => address._id.toString() !== action.payload.toString()
        );
      })
      .addCase(addressThunks.deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(addressThunks.editAddress.pending, (state) => {
        state.loading = true;
      })
      // TODO: Check if this works
      .addCase(addressThunks.editAddress.fulfilled, (state, action) => {
        state.loading = false;
        const updatedAddress = action.payload;
        const updatedAddresses = state.data.map((address) =>
          address._id === updatedAddress._id ? updatedAddress : address
        );
        state.data = updatedAddresses;
      })
      .addCase(addressThunks.editAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(addressThunks.getAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(addressThunks.getAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addressThunks.getAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      });
  },
});

export const { updateAddressState } = addressSlice.actions;

export default addressSlice.reducer;
