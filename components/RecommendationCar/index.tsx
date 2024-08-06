'use client'

import React, { useEffect } from 'react'
import CardCar from '../CardCar';
import { getDictionary } from '@/get-dictionary';
import { DataCardCar, ListCar } from '@/types/product';
import { Locale } from '@/i18n-config';

export default function RecommendationCar({
  dictionary,
  params,
  listCar
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["common"];
  params: {lang: Locale};
  listCar: ListCar
}) {
  const [page, setPage] = React.useState(1)
  const [listRecommendCar, setListRecommendCar] = React.useState<DataCardCar[]>(listCar.items)
  const [totalListCar, setTotalListCar] = React.useState<number>(listCar.pagination.total)

  const urlAPI = process.env.NEXT_PUBLIC_URL_API;

  useEffect(() => {
    if (page > 1) {
      fetchData()
    }
  }, [page])

  const handleShowMore = () => {
    setPage(page + 1)
  }

  const getData = async () => {
    const res = await fetch(`${urlAPI}/v1/cars?filter=recommended&limit=8&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": `${params.lang === 'en' ? 'en-US' : 'vi'}`
        }
      }    
    )
    const listData = await res.json()
    setListRecommendCar(listData.data.items)
    setTotalListCar(listData.data.pagination.total)

    return listData.data
  }

  const fetchData = async () => {
    const res = await getData();
    setListRecommendCar([...listRecommendCar, ...res.items]);
  };

  return (
    <div className="1xl:w-[1312px] m-auto pt-[32px] xs:px-[24px] 1xl:px-0">
      <div className="h-[44px] sm:px-[20px]">
        <p className="text-[#90A3BF] text-[16px] font-semibold">
          {dictionary.titleRecommendationCar}
        </p>
      </div>
      <div className="grid 1xl:grid-cols-4 lg:grid-cols-3 ml:grid-cols-2 xs:grid-cols-1 gap-8 xs:justify-items-center lg:justify-items-start">
        {listRecommendCar?.map((item: DataCardCar, index: number) => (
          <CardCar list={item} key={item.id + index} dictionary={dictionary} params={params}/>
        ))}
      </div>

      {/* Show More */}
      <div className="relative mt-[64px] mb-[24px] flex justify-center">
        {listRecommendCar?.length >= totalListCar ? "" : (
          <button onClick={handleShowMore} className="px-[20px] py-[10px] text-white font-semibold bg-[#3563E9] rounded-[4px] hover:bg-[#54A6FF] normal-case">
            {dictionary.btnShowMore}
          </button>
        )}
        <p className="absolute top-[25%] right-0 text-[14px] text-[#90A3BF]">
          {totalListCar} {dictionary.car}
        </p>
      </div>
    </div>
  );
}
