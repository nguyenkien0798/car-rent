import { Params } from "@/types/common";
import { get } from "../axios";
import { serialize } from "@/utils/helpers";

export const fetchFilterTag = async () => {
  const response = await get("/v1/car-tags");

  return response.data.data;
};

export const fetchRecommendCar = async (params: Params) => {
  const response = await get(
    `/v1/product/car/recommend?limit=${params.limit}&page=${params.page}`
  );

  return response.data.data;
};

export const fetchCarDetail = async (params: string) => {
  const respone = await get(`/v1/product/car/${params}`);

  return respone.data.data;
};

export const fetchListCar = async (params: Params) => {
  const responese = await get(
    `/v1/product/car?${serialize(params)}`
  );

  return responese.data.data
};
