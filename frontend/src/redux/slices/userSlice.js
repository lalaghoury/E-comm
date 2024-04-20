// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { message } from "antd";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";

// const initialState = {
//   data: {},
//   loading: false,
//   error: null,
// };

// export const userThunks = {
//   getUser: createAsyncThunk("user/getUser", async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:5000/api/user/get-user"
//       );
//       if (data.success) {
//         // dispatch(addressThunks.getAddress());
//         return data.user;
//       }
//     } catch (error) {
//       console.error("Error fetching user:", error);
//       return rejectWithValue(error.response.data.message);
//     }
//   }),
//   editAddress: createAsyncThunk(
//     "address/editAddress",
//     async (_, { dispatch, rejectWithValue }) => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/address");
//         const data = await response.data;
//         if (data.success) {
//           dispatch(
//             addressSlice.actions.updateAddressState({ address: data.address })
//           );
//           return data.address;
//         }
//       } catch (error) {
//         console.error("Error fetching address:", error);
//         return rejectWithValue(error.response.data);
//       }
//     }
//   ),
// };

// const addressSlice = createSlice({
//   name: "addresses",
//   initialState,
//   reducers: {
//     updateAddressState: (state, action) => {
//       state.addresses = action.payload.addresses;
//     },
//   },
// });

// export const { updateAddressState } = addressSlice.actions;

// export default addressSlice.reducer;
