/* eslint-disable @typescript-eslint/no-explicit-any */
import { Login, Register, RootAuth, User } from "@/types/auth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "cookies-next";

const initialState: RootAuth = {
  isLoadingRegister: false,
  isRegister: "",
  messageRegister: "",
  isLoadingLogin: false,
  isLogin: "",
  isLoadingVerifyEmail: false,
  isVerifyEmail: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    register: (state, action: PayloadAction<Register>) => {
      state.isLoadingRegister = true;
    },
    registerSuccess: (state, action) => {
      switch (action.payload.status) {
        case 204:
          state.isRegister = "success";
          state.isLoadingRegister = false;
          break;
        case 400:
          state.isRegister = "error";
          state.messageRegister = action.payload.data.message;
          state.isLoadingRegister = false;
          break;
      }
    },

    /* eslint-disable @typescript-eslint/no-unused-vars */
    login: (state, action: PayloadAction<Login>) => {
      state.isLoadingLogin = true;
    },

    loginSuccess: (state, action) => {
      switch (action.payload.status) {
        case 200 || 204:
          state.isLogin = "success";
          state.isLoadingLogin = false;
          break;
        case 400:
          state.isLogin = "error";
          state.isLoadingLogin = false;
          break;
        case 401:
          state.isLogin = "email not verify";
          state.isLoadingLogin = false;
          break;
      }
    },

    removeStateLogin: (state) => {
      state.isLogin = "";
    },

    /* eslint-disable @typescript-eslint/no-unused-vars */
    verifyEmail: (state, action: PayloadAction<string>) => {
      state.isLoadingVerifyEmail = true;
    },
    verifyEmailSuccess: (state, action) => {
      if (action.payload.status === 200 || action.payload.status === 204) {
        state.isLoadingVerifyEmail = false;
        state.isVerifyEmail = "success";
      } else {
        state.isLoadingVerifyEmail = false;
        state.isVerifyEmail = "error";
      }
    },

    getCurrentUser() {},
    getCurrentUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      if (state.user) {
        setCookie("user", state.user);
      }
    },
    getCurrentUserError: () => {
      deleteCookie("user");
    },

    logoutRefreshToken: (state) => {
      state.user = undefined;
      deleteCookie('access_token')
      deleteCookie('refresh_token')
    },

    logout: (state) => {
      state.isRegister = "";
      state.messageRegister = "";
      state.isLogin = "";
      state.isVerifyEmail = "";
      state.user = undefined;
    },
    logoutSucces: () => {
      deleteCookie("user");
      deleteCookie("access_token");
      deleteCookie("refresh_token");
    },
  },
});

export const {
  register,
  registerSuccess,
  login,
  loginSuccess,
  verifyEmail,
  verifyEmailSuccess,
  getCurrentUser,
  getCurrentUserSuccess,
  getCurrentUserError,
  logout,
  logoutSucces,
  logoutRefreshToken,
  removeStateLogin,
} = authSlice.actions;

export default authSlice.reducer;
