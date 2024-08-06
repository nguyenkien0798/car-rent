import React from "react";
import CarDetail from "@/components/CarDetail";
import CarReviews from "@/components/CarReviews";
import FilterFindCar from "@/components/FilterFindCar";
import RecentCarDetail from "@/components/RecentCarDetail";
import RecommendationCarDetail from "@/components/RecommendationCarDetail";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { ImageCarDetail } from "@/types/product";

const urlAPI = process.env.NEXT_PUBLIC_URL_API;

export async function generateMetadata({ params }: { params: { lang: Locale, car_id: string } }) {
  const res = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(`${urlAPI}/v1/cars/${params.car_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": `${params.lang === 'en' ? 'en-US' : 'vi'}`,
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  };
  const carDetail = await res()

  const imageUrl = carDetail.data.images.map((item: ImageCarDetail) => item.image_url)

  return {
    title: carDetail.data.name,
    keywords: carDetail.data.name,
    category: carDetail.data.car_type,
    openGraph: {
      type: "website",
      title: carDetail.data.name,
      description: "Show detail car!",
      images: [...imageUrl],
      siteName: carDetail.data.name,
      locale: "vi_VN",
    },
  }
}

export default async function CarDetailPage({ params }: { params: { lang: Locale, car_id: string } }) {
  const dictionary = await getDictionary(params.lang)

  const res = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(`${urlAPI}/v1/cars/${params.car_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": `${params.lang === 'en' ? 'en-US' : 'vi'}`,
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  };
  const carDetail = await res()  

  const responseListCar = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(`${urlAPI}/v1/cars?filter=recommended&limit=4&page=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": `${params.lang === 'en' ? 'en-US' : 'vi'}`,
          }
        }    
      )
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  }
  const listCar = await responseListCar()  

  const responseCarReview = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(`${urlAPI}/v1/reviews?car_id=${params.car_id}&limit=4&offset=1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": `${params.lang === 'en' ? 'en-US' : 'vi'}`,
        }
      }    
    )
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  }
  const listCarReview = await responseCarReview();

  return (
    <div className="1xl:w-[1312px] mx-auto">
      <div className="pt-[10px] pb-[32px]">
        <FilterFindCar dictionary={dictionary.common} params={params.lang}/>
      </div>

      {/* Car Detail */}
      <CarDetail dictionary={dictionary.common} car_id={params.car_id} productCarDetail={carDetail.data} lang={params.lang}/>

      {/* Car Review */}
      <CarReviews dictionary={dictionary.common} params={params.lang} car_id={params.car_id} listCarReview={listCarReview.data}/>

      {/* Recent Car */}
      <RecentCarDetail dictionary={dictionary.common} params={params}/>

      {/* Recommendation Car */}
      <RecommendationCarDetail dictionary={dictionary.common} params={params} listCar={listCar.data}/>
    </div>
  );
}