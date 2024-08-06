import { Register, Login } from "@/types/auth";
import { post, get } from "../axios";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { store } from "@/redux/store";
import { logoutRefreshToken } from "@/redux/slice/auth";
import Notify from "@/components/Notify";

const refreshTokenValue = getCookie("refresh_token");
const locale = getCookie('locale')

const httpRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  headers: { 
    "Content-Type": "application/json",
    Authorization: `Bearer ${refreshTokenValue}`,
  },
});

export const registerUser = async (params: Register) => {
  const response = await post("/v1/auth/register", params);

  return response;
};

export const loginUser = async (params: Login) => {
  const response = await post("/v1/auth/login", params);
  setCookie("access_token", response.data.data.access_token);
  setCookie("refresh_token", response.data.data.refresh_token);
  return response;
};

export const verifyEmailUser = async (params: string) => {
  const response = await get(`/v1/auth/verify/email?token=${params}`);

  return response;
};

export const getMe = async () => {
  const response = await get(`/v1/auth/me`);

  return response.data.data;
};

export const refreshToken = async () => {
  try {
    const res = await httpRequest.post("/v1/auth/refresh");
    const response = await res.data.data;
    setCookie("access_token", response.access_token);

    return response.access_token;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response.data.error_id === 'CUS-0406') {
      store.dispatch(logoutRefreshToken())
      if (locale === 'en') {
        Notify({ message: 'Your login session has expired', type: 'error' })
      } else if (locale === 'vi') {
        Notify({ message: 'Phiên đăng nhập của bạn đã hết hạn', type: 'error' })
      }
    }
  }
};

export const logoutUser = async () => {
  const response = await post(`/v1/auth/logout`);

  return response;
};
