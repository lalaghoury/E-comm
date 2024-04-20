import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice";
import addressReducer from "../slices/addressSlice";
import productReducer from "../slices/productSlice";
import orderReducer from "../slices/orderSlice";
import wishlistReducer from "../slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    addresses: addressReducer,
    products: productReducer,
    orders: orderReducer,
    wishlist: wishlistReducer,
  },
});
