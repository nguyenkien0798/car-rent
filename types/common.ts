export interface Params {
  limit?: number;
  page?: number;
  offset?: number;
  search?: string;
  capacity?: string | string[];
  type?: string | string[];
  price?: string | number | number[];
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
}

export interface ParamsOrderSummary {
  id: string;
  coupon_code?: string;
  pickup_date?: string;
  dropoff_date?: string;
}

export interface BodyParamsSummary {
  items: ParamsOrderSummary[]
  coupon_code?: string;
}