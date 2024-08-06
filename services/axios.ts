/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */

import axios from "axios";
import { refreshToken } from "./api/authService";
import { getCookie } from "cookies-next";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
});

instance.interceptors.request.use(async (config: any) => {
  const locale = getCookie("locale");
  const accessToken = getCookie("access_token");
  config.headers = {
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
    "Content-Type": "application/json",
    "Accept-Language": `${locale === "en" ? "en-US" : "vi"}`,
    ...config.headers,
  };

  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const request = await error.config;

    if (
      (error.response.data === "errors.CUS-0408" ||
        error.response.data.error_id === "AUTH-0504" ||
        error.response.data.error_id === "CUS-0408" ||
        error.response.statusCode === 401) &&
      !request._retry
    ) {
      request._retry = true;
      const access_token = await refreshToken();

      request.headers = { Authorization: `Bearer ${access_token}` };
      return instance(request);
    }
    return Promise.reject(error);
  }
);

export const get = async (url: string, data?: any) => {
  try {
    const response = await instance.get(url, { params: data });
    return response;
  } catch (error) {
    throw error;
  }
};

export const post = async (url: string, data?: any) => {
  try {
    const response = await instance.post(url, data);
    return response;
  } catch (error: any) {
    throw error;
  }
};
