import Category from "@/components/Category";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { DataCardCar } from "@/types/product";
import dayjs from "dayjs";
import React, { Suspense } from "react";

const urlAPI = process.env.NEXT_PUBLIC_URL_API;

export async function generateMetadata({ params, searchParams: {
  type_ids,
  capacities,
  search,
  max_price,
  pickup_date,
  pickup_location_id,
  dropoff_date,
  dropoff_location_id,
}, }: { params: { lang: Locale, car_id: string }; searchParams: {
  type_ids: string;
  capacities: string;
  search: string;
  max_price: string;
  pickup_location_id: string;
  pickup_date: string;
  dropoff_location_id: string;
  dropoff_date: string;
}; }) {
  const paramsUrlPickUpAndDropOff = `${pickup_location_id ? `&pickup_location_id=${pickup_location_id}` : ""}${pickup_date ? `&pickup_date=${dayjs(pickup_date).format('MM/DD/YYYY')}` : ""}${dropoff_location_id ? `&dropoff_location_id=${dropoff_location_id}` : ""}${dropoff_date ? `&dropoff_date=${dayjs(dropoff_date).format('MM/DD/YYYY')}` : ""}`
  const listCarCategory = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(
        `${urlAPI}/v1/cars?limit=9&offset=1${type_ids ? `&type_ids=${type_ids}` : ""}${capacities ? `&capacities=${capacities}` : ""}${max_price ? `&max_price=${max_price}` : ""}${search ? `&search=${search}` : ""}${paramsUrlPickUpAndDropOff}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": `${params.lang === 'en' ? 'en-US' : 'vi'}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  }
  const listCar = await listCarCategory();

  const imageUrl = listCar.data.items.map((item: DataCardCar) => item.thumbnail_url)
  const carType = listCar.data.items.map((item: DataCardCar) => item.type)

  return {
    title: 'Category',
    keywords: 'Category',
    category: carType,
    openGraph: {
      type: "website",
      title: 'Category',
      description: 'Choose the car you want rent!',
      images: [...imageUrl],
      siteName: 'Category',
      locale: "vi_VN",
    },
  }
}

export default async function CategoryPage({
  params,
  searchParams: {
    type_ids,
    capacities,
    search,
    max_price,
    pickup_date,
    pickup_location_id,
    dropoff_date,
    dropoff_location_id,
  },
}: {
  params: { lang: Locale };
  searchParams: {
    type_ids: string;
    capacities: string;
    search: string;
    max_price: string;
    pickup_location_id: string;
    pickup_date: string;
    dropoff_location_id: string;
    dropoff_date: string;
  };
}) {
  const dictionary = await getDictionary(params.lang);
  const paramsUrlPickUpAndDropOff = `${pickup_location_id ? `&pickup_location_id=${pickup_location_id}` : ""}${pickup_date ? `&pickup_date=${dayjs(pickup_date).format('MM/DD/YYYY')}` : ""}${dropoff_location_id ? `&dropoff_location_id=${dropoff_location_id}` : ""}${dropoff_date ? `&dropoff_date=${dayjs(dropoff_date).format('MM/DD/YYYY')}` : ""}`

  const listCarCategory = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(
        `${urlAPI}/v1/cars?limit=9&offset=1${type_ids ? `&type_ids=${type_ids}` : ""}${capacities ? `&capacities=${capacities}` : ""}${max_price ? `&max_price=${max_price}` : ""}${search ? `&search=${search}` : ""}${paramsUrlPickUpAndDropOff}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": `${params.lang === 'en' ? 'en-US' : 'vi'}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  }
  const listCar = await listCarCategory();

  return (
    <Suspense>
      <div className="max-w-[1440px] mx-auto">
        <Category
          dictionary={dictionary.common}
          params={params}
          list={listCar?.data}
          type_ids={type_ids && decodeURIComponent(type_ids)}
          capacities={capacities && decodeURIComponent(capacities)}
          max_price={max_price && decodeURIComponent(max_price)}
          search={search && search}
          pickup_location_id={pickup_location_id}
          pickup_date={pickup_date && pickup_date.replaceAll('%2F', '')}
          dropoff_location_id={dropoff_location_id}
          dropoff_date={dropoff_date && dropoff_date.replaceAll('%2F', '')}
        />
      </div>
    </Suspense>
  );
}
