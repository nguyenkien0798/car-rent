import { Pagination } from "./common";

export interface RootStatePayment {
  ordersSummary: OrdersSummary;
  listOrder: DataListOrders;
  orderDetail?: DataOrderDetail;
  errorRentalSummary?: ErrorRentalSummary;
}

export interface OrdersSummary {
  items: DataOrderSummary[]
  coupons: Coupone
  tax: number;
  subtotal: number;
  total: number;
}

export interface DataOrderSummary {
  id: number;
  name: string;
  thumbnail_url: string;
  price: number;
  sale_price: number;
  avg_rating: number
}

export interface Coupone {
  code: string;
  type: string;
  amount: number;
  Quantity: number;
}

export interface DataListOrders {
  items: ListOrders[]
  pagination: Pagination
}

export interface ListOrders {
  id: string;
  code: string;
  total: number;
  sale_price: number;
  payment_method_name: string;
  status: string;
  created_at: string;
}

export interface DataOrderDetail {
  id: number;
  code: string;
  customer_name: string;
  phone_number: string;
  address: string;
  city: string;
  payment_method_name: string;
  status: string;
  subtotal: number;
  coupon_discount: number;
  tax: number;
  total: number;
  created_at: string;
  items: OrderDetail[];
}

export interface OrderDetail {
  id: number;
  name: string;
  thumbnail: string;
  price: number;
  sale_price: number;
  pickup_location: string;
  pickup_date: string;
  dropoff_location: string;
  dropoff_date: string;
}

export interface ErrorRentalSummary {
  error_id: string;
  message: string;
  title: string;
}

export interface PaymentInfo {
  customer_name: string;
  phone_number: string;
  address: string;
  city: string;
  pickup_location_id: string;
  pickup_date: string;
  dropoff_location_id: string;
  dropoff_date: string;
}