import { Params, BodyParamsSummary } from "@/types/common";
import { get, post } from "../axios";
import { serialize } from "@/utils/helpers";

export const fetchDataOrderSummary = async (params: BodyParamsSummary) => {
  const response = await post(`/v1/orders/preview`, params);

  return response.data.data;
};

export const fetchListOrders = async (params: Params) => {
  const response = await get(`/v1/orders?${serialize(params)}`);

  return response.data.data;
};

export const fetchOrderDetail = async (params: string) => {
  const response = await get(`/v1/orders/${params}`);

  return response.data.data;
};