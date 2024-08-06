import { Pagination } from "./common"

export interface RootProduct {
  filterTag: FilterTag;
  recommendCar: ListCar;
  recommendCarDetail?: ListCar;
  carDetail?: CarDetail;
  listCar: ListCar;
  dataPickUpAndDropOff?: LocalPickUpAndDropOff;
}

export interface LocalPickUpAndDropOff {
  pickup_location_id?: string;
  pickup_date?: string;
  dropoff_location_id?: string;
  dropoff_date?: string;
}

export interface FilterTag {
  types: Types[],
  capacities: CapacityType[]
  price_range: Prices
}

export interface Types {
  id: number;
  name: string;
  total: number;
}

export interface CapacityType {
  id: number;
  name: string;
  total: number;
}

export interface Prices {
  min: number;
  max: number;
}

export interface ListCar {
  items: DataCardCar[];
  pagination: Pagination;
}

export interface DataCardCar {
  id: number;
  name: string;
  thumbnail_url: string,
  steering: string,
  gasoline: number,
  price: number,
  sale_price: number,
  capacity: number,
  type: string
}

export interface CarDetail {
  id: number;
  name: string;
  description: string;
  steering: string;
  gasoline: number;
  sale_price: number;
  price: number,
  avg_rating: number;
  capacity: number;
  car_type: string;
  location: number;
  images: ImageCarDetail[]
}

export interface ImageCarDetail {
  image_url: string;
  title: string;
  content: string;
}

export interface ListCarReview {
  items: CarReview[];
  pagination: Pagination;
  total_review: number;
}

export interface CarReview {
  user_id: number;
  avatar_url: string;
  user_name: string;
  user_job: string;
  content: string;
  rating: number;
  created_at: string;
}
