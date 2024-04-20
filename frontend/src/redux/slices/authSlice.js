import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signin as signinAction, signout as signoutAction } from "./authSlice";

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  verified: false,
};

export const useAuthActions = () => {
  const dispatch = useDispatch();

  const signin = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        values
      );
      const data = response.data;
      if (data.success) {
        const { user } = data;
        dispatch(signinAction({ user }));
        message.success(data.message);
        return true;
      }
    } catch (error) {
      message.error(
        error.response.data.message
          ? error.response.data.message
          : "Something went wrong"
      );
      console.log(error.response.data);
      return false;
    }
  };

  const signout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signout"
      );
      const data = response.data;
      if (data.success) {
        message.success(data.message, 1, () => {
          dispatch(signoutAction());
        });
      }
    } catch (error) {
      message.error(
        error.response.data.message
          ? error.response.data.message
          : "Something went wrong"
      );
      console.log(error.response.data);
    }
  };

  return { signin, signout };
};

export const authThunks = {};

export const useAuthEffect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const { user } = JSON.parse(auth);
      dispatch(signinAction({ user }));
    }
  }, [dispatch]);
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action) => {
      const { user } = action.payload;
      localStorage.setItem(
        "auth",
        JSON.stringify({
          ...state,
          user,
          isLoggedIn: true,
          verified: true,
        })
      );
      state.user = user;
      state.verified = true;
      state.isLoggedIn = true;
      state.loading = false;
    },
    signout: (state) => {
      Object.assign(state, initialState);
      localStorage.removeItem("auth");
      window.location.href = "/sign-in";
    },
  },
});

export const { signin, signout } = authSlice.actions;

export default authSlice.reducer;
