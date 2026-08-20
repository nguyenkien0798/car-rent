import type { Metadata } from "next";
import Category from "@/components/Category";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { DataCardCar } from "@/types/product";
import { customFetch } from "@/services/http";
import dayjs from "dayjs";
import React, { Suspense } from "react";

const buildCarListQuery = (params: {
  offset: number;
  type_ids?: string;
  capacities?: string;
  max_price?: string;
  search?: string;
  pickup_location_id?: string;
  pickup_date?: string;
  dropoff_location_id?: string;
  dropoff_date?: string;
  lang: Locale;
}) => ({
  limit: 9,
  offset: params.offset,
  type_ids: params.type_ids || undefined,
  capacities: params.capacities || undefined,
  max_price: params.max_price || undefined,
  search: params.search || undefined,
  pickup_location_id: params.pickup_location_id || undefined,
  pickup_date: params.pickup_date
    ? dayjs(params.pickup_date).format("MM/DD/YYYY")
    : undefined,
  dropoff_location_id: params.dropoff_location_id || undefined,
  dropoff_date: params.dropoff_date
    ? dayjs(params.dropoff_date).format("MM/DD/YYYY")
    : undefined,
});

const fetchCarsByCategory = async (params: {
  offset: number;
  type_ids?: string;
  capacities?: string;
  max_price?: string;
  search?: string;
  pickup_location_id?: string;
  pickup_date?: string;
  dropoff_location_id?: string;
  dropoff_date?: string;
  lang: Locale;
}) => {
  return customFetch<{
    data: {
      items: DataCardCar[];
      pagination: { total: number; limit: number; offset: number };
    };
  }>("/v1/cars", {
    method: "GET",
    query: buildCarListQuery(params),
    lang: params.lang === "en" ? "en" : "vi",
  });
};

export async function generateMetadata({
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
  params: { lang: Locale; car_id: string };
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
}): Promise<Metadata> {
  const listCar = await fetchCarsByCategory({
    offset: 1,
    type_ids,
    capacities,
    max_price,
    search,
    pickup_location_id,
    pickup_date,
    dropoff_location_id,
    dropoff_date,
    lang: params.lang,
  });

  const imageUrl = listCar.data.items.map(
    (item: DataCardCar) => item.thumbnail_url,
  );
  const carType = listCar.data.items.map((item: DataCardCar) => item.type);
  const filters = [type_ids, capacities, search, max_price]
    .filter(Boolean)
    .map((value) => decodeURIComponent(value))
    .join(" ");

  const title =
    params.lang === "en"
      ? filters
        ? `Car rental results for ${filters}`
        : "Find the best car rental"
      : filters
        ? `Kết quả thuê xe cho ${filters}`
        : "Tìm xe thuê phù hợp";

  const description =
    params.lang === "en"
      ? "Browse a wide range of rental cars with filters for type, capacity, price, and pickup location."
      : "Duyệt danh sách xe thuê đa dạng theo loại, sức chứa, giá và địa điểm nhận xe.";

  return {
    title,
    description,
    keywords: ["car rental", "Morent", ...carType, filters || "vehicle rental"],
    alternates: {
      canonical: `/${params.lang}/category`,
      languages: {
        en: "/en/category",
        vi: "/vi/category",
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      images: [...imageUrl],
      siteName: "Morent",
      locale: params.lang === "en" ? "en_US" : "vi_VN",
    },
  };
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

  const listCar = await fetchCarsByCategory({
    offset: 1,
    type_ids,
    capacities,
    max_price,
    search,
    pickup_location_id,
    pickup_date,
    dropoff_location_id,
    dropoff_date,
    lang: params.lang,
  });

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
          pickup_date={pickup_date && pickup_date.replaceAll("%2F", "")}
          dropoff_location_id={dropoff_location_id}
          dropoff_date={dropoff_date && dropoff_date.replaceAll("%2F", "")}
        />
      </div>
    </Suspense>
  );
}
