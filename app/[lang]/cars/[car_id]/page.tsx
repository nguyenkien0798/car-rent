import type { Metadata } from "next";
import React from "react";
import CarDetail from "@/components/CarDetail";
import CarReviews from "@/components/CarReviews";
import FilterFindCar from "@/components/FilterFindCar";
import RecentCarDetail from "@/components/RecentCarDetail";
import RecommendationCarDetail from "@/components/RecommendationCarDetail";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import {
  CarDetail as CarDetailData,
  ImageCarDetail,
  ListCar,
  ListCarReview,
} from "@/types/product";
import { customFetch } from "@/services/http";

type ApiResponse<T> = { data: T };

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale; car_id: string };
}): Promise<Metadata> {
  const res = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return customFetch<ApiResponse<CarDetailData>>(
        `/v1/cars/${params.car_id}`,
        {
          lang: params.lang,
        },
      );
    } catch (error) {
      throw error;
    }
  };
  const carDetail = await res();

  const imageUrl = carDetail.data.images.map(
    (item: ImageCarDetail) => item.image_url,
  );
  const description =
    carDetail.data.description || `Explore ${carDetail.data.name} at Morent.`;

  return {
    title: carDetail.data.name,
    description,
    keywords: [
      carDetail.data.name,
      carDetail.data.car_type,
      "Morent",
      "car rental",
    ],
    category: carDetail.data.car_type,
    alternates: {
      canonical: `/${params.lang}/cars/${params.car_id}`,
      languages: {
        en: `/en/cars/${params.car_id}`,
        vi: `/vi/cars/${params.car_id}`,
      },
    },
    openGraph: {
      type: "website",
      title: carDetail.data.name,
      description,
      images: [...imageUrl],
      siteName: "Morent",
      locale: params.lang === "en" ? "en_US" : "vi_VN",
    },
  };
}

export default async function CarDetailPage({
  params,
}: {
  params: { lang: Locale; car_id: string };
}) {
  const dictionary = await getDictionary(params.lang);

  const res = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return customFetch<ApiResponse<CarDetailData>>(
        `/v1/cars/${params.car_id}`,
        {
          lang: params.lang,
        },
      );
    } catch (error) {
      throw error;
    }
  };
  const carDetail = await res();

  const responseListCar = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return customFetch<ApiResponse<ListCar>>(`/v1/cars`, {
        query: { filter: "recommended", limit: 4, page: 1 },
        lang: params.lang,
      });
    } catch (error) {
      throw error;
    }
  };
  const listCar = await responseListCar();

  const responseCarReview = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return customFetch<ApiResponse<ListCarReview>>(`/v1/reviews`, {
        query: { car_id: params.car_id, limit: 4, offset: 1 },
        lang: params.lang,
      });
    } catch (error) {
      throw error;
    }
  };
  const listCarReview = await responseCarReview();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: carDetail.data.name,
    description: carDetail.data.description,
    image: carDetail.data.images.map((item: ImageCarDetail) => item.image_url),
    brand: {
      "@type": "Brand",
      name: "Morent",
    },
    vehicleType: carDetail.data.car_type,
    seatingCapacity: carDetail.data.capacity,
    fuelType: carDetail.data.gasoline ? "Gasoline" : "Unknown",
    offers: {
      "@type": "Offer",
      price: carDetail.data.sale_price || carDetail.data.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://morent.com"}/${params.lang}/cars/${params.car_id}`,
    },
  };

  return (
    <div className="1xl:w-[1312px] mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="pt-[10px] pb-[32px]">
        <FilterFindCar dictionary={dictionary.common} params={params.lang} />
      </div>

      {/* Car Detail */}
      <CarDetail
        dictionary={dictionary.common}
        car_id={params.car_id}
        productCarDetail={carDetail.data}
        lang={params.lang}
      />

      {/* Car Review */}
      <CarReviews
        dictionary={dictionary.common}
        params={params.lang}
        car_id={params.car_id}
        listCarReview={listCarReview.data}
      />

      {/* Recent Car */}
      <RecentCarDetail dictionary={dictionary.common} params={params} />

      {/* Recommendation Car */}
      <RecommendationCarDetail
        dictionary={dictionary.common}
        params={params}
        listCar={listCar.data}
      />
    </div>
  );
}
