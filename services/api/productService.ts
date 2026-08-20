import { Params } from "@/types/common";
import { customFetch } from "../http";

type ApiResponse<T> = {
  data: T;
};

export const fetchFilterTag = async () => {
  const response = await customFetch<ApiResponse<Record<string, unknown>>>('/v1/car-tags');

  return response.data;
};

export const fetchRecommendCar = async (params: Params) => {
  const response = await customFetch<ApiResponse<Record<string, unknown>>>("/v1/product/car/recommend", {
    query: {
      limit: params.limit,
      page: params.page,
    },
  });

  return response.data;
};

export const fetchCarDetail = async (params: string) => {
  const response = await customFetch<ApiResponse<Record<string, unknown>>>(`/v1/product/car/${params}`);

  return response.data;
};

export const fetchListCar = async (params: Params) => {
  const response = await customFetch<ApiResponse<Record<string, unknown>>>("/v1/product/car", {
    query: {
      limit: params.limit,
      page: params.page,
      offset: params.offset,
      search: params.search,
      capacity: Array.isArray(params.capacity) ? params.capacity.join(',') : params.capacity,
      type: Array.isArray(params.type) ? params.type.join(',') : params.type,
      price: Array.isArray(params.price) ? params.price.join(',') : params.price,
    },
  });

  return response.data;
};
