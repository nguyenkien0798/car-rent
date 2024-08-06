import React from 'react'
import AdvertisingBanner from "@/components/AdvertisingBanner";
import FilterFindCar from "@/components/FilterFindCar";
import PopularCar from "@/components/PopularCar";
import RecommendationCar from "@/components/RecommendationCar";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { DataCardCar } from '@/types/product';

// export const metadata : Metadata = {
//   title: 'Morent',  
// }

const urlAPI = process.env.NEXT_PUBLIC_URL_API;  

export async function generateMetadata({ params }: { params: { lang: Locale, car_id: string } }) {
  const responseListRecommendCar = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(`${urlAPI}/v1/cars?filter=recommended&limit=8&page=1`,
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
  const listRecommendCar = await responseListRecommendCar()

  const imageUrl = listRecommendCar.data.items.map((item: DataCardCar) => item.thumbnail_url)
  const carType = listRecommendCar.data.items.map((item: DataCardCar) => item.type)
  const carName = listRecommendCar.data.items.map((item: DataCardCar) => item.name)

  return {
    title: "Morent",
    category: carType,
    keywords: [...carName],
    openGraph: {
      type: "website",
      title: "Morent",
      description: "Choose the car you want rent!",
      images: [...imageUrl],
      siteName: "Morent",
      locale: "vi_VN",
    },
  }
}

export default async function Home({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);

  const responseListRecommendCar = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(`${urlAPI}/v1/cars?filter=recommended&limit=8&page=1`,
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
  const listRecommendCar = await responseListRecommendCar()

  const responseListPopularCar = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(`${urlAPI}/v1/cars?filter=popular&limit=4&page=1`,
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
  const listPopularCar = await responseListPopularCar()


  return (
    <div className="py-[32px]">
      <AdvertisingBanner dictionary={dictionary.banner}/>
      {/* Filter Pick up and Drop off */}
      <FilterFindCar dictionary={dictionary.common} params={params.lang}/>
      {/* Popular */}
      <PopularCar dictionary={dictionary.common} params={params} listCar={listPopularCar.data}/>
      {/* Recommendation Car */}
      <RecommendationCar dictionary={dictionary.common} params={params} listCar={listRecommendCar.data}/>
    </div>
  );
}
