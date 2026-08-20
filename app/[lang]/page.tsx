import React from "react";
import type { Metadata } from "next";
import AdvertisingBanner from "@/components/AdvertisingBanner";
import FilterFindCar from "@/components/FilterFindCar";
import PopularCar from "@/components/PopularCar";
import RecommendationCar from "@/components/RecommendationCar";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { DataCardCar, ListCar } from "@/types/product";
import { customFetch } from "@/services/http";

type ListCarResponse = { data: ListCar };

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const responseListRecommendCar = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return customFetch<ListCarResponse>(`/v1/cars`, {
        query: { filter: "recommended", limit: 8, page: 1 },
        lang: params.lang,
      });
    } catch (error) {
      throw error;
    }
  };
  const listRecommendCar = await responseListRecommendCar();

  const imageUrl = listRecommendCar.data.items.map(
    (item: DataCardCar) => item.thumbnail_url,
  );
  const carType = listRecommendCar.data.items.map(
    (item: DataCardCar) => item.type,
  );
  const carName = listRecommendCar.data.items.map(
    (item: DataCardCar) => item.name,
  );

  const description =
    params.lang === "en"
      ? "Find the best car rental deals in Vietnam with Morent. Easy booking, flexible daily rentals, and trusted vehicles for every trip."
      : "Tìm xe thuê tốt nhất tại Việt Nam cùng Morent. Đặt xe dễ dàng, linh hoạt theo ngày và dịch vụ tin cậy cho mọi chuyến đi.";

  return {
    title:
      params.lang === "en" ? "Car Rental in Vietnam" : "Thuê xe tại Việt Nam",
    description,
    keywords: [...carName, "Morent", "car rental", ...carType],
    alternates: {
      canonical: `/${params.lang}`,
      languages: {
        en: "/en",
        vi: "/vi",
      },
    },
    openGraph: {
      type: "website",
      title:
        params.lang === "en"
          ? "Morent | Car Rental in Vietnam"
          : "Morent | Thuê xe tại Việt Nam",
      description,
      images: [...imageUrl],
      siteName: "Morent",
      locale: params.lang === "en" ? "en_US" : "vi_VN",
    },
  };
}

export default async function Home({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);

  const responseListRecommendCar = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return customFetch<ListCarResponse>(`/v1/cars`, {
        query: { filter: "recommended", limit: 8, page: 1 },
        lang: params.lang,
      });
    } catch (error) {
      throw error;
    }
  };
  const listRecommendCar = await responseListRecommendCar();

  const responseListPopularCar = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return customFetch<ListCarResponse>(`/v1/cars`, {
        query: { filter: "popular", limit: 4, page: 1 },
        lang: params.lang,
      });
    } catch (error) {
      throw error;
    }
  };
  const listPopularCar = await responseListPopularCar();

  const homepageSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name:
      params.lang === "en"
        ? "Morent | Car Rental in Vietnam"
        : "Morent | Thuê xe tại Việt Nam",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://morent.com"}/${params.lang}`,
    description:
      params.lang === "en"
        ? "Find the best car rental deals in Vietnam with Morent. Easy booking, flexible daily rentals, and trusted vehicles for every trip."
        : "Tìm xe thuê tốt nhất tại Việt Nam cùng Morent. Đặt xe dễ dàng, linh hoạt theo ngày và dịch vụ tin cậy cho mọi chuyến đi.",
    publisher: {
      "@type": "Organization",
      name: "Morent",
      logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://morent.com"}/images/icon_car.png`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${process.env.NEXT_PUBLIC_SITE_URL || "https://morent.com"}/${params.lang}/category?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <main className="py-[32px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <h1 className="sr-only">
        {params.lang === "en"
          ? "Morent | Premium car rental in Vietnam"
          : "Morent | Thuê xe cao cấp tại Việt Nam"}
      </h1>
      <AdvertisingBanner dictionary={dictionary.banner} />
      {/* Filter Pick up and Drop off */}
      <FilterFindCar dictionary={dictionary.common} params={params.lang} />
      {/* Popular */}
      <PopularCar
        dictionary={dictionary.common}
        params={params}
        listCar={listPopularCar.data}
      />
      {/* Recommendation Car */}
      <RecommendationCar
        dictionary={dictionary.common}
        params={params}
        listCar={listRecommendCar.data}
      />
    </main>
  );
}
