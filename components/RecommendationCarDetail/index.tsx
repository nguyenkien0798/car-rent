'use client'

import React, { useEffect, useState } from 'react'
import CardCar from "../CardCar";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { DataCardCar, ListCar } from "@/types/product";
import { useRouter } from 'next/navigation';

export default function RecommendationCarDetail({
  dictionary,
  params,
  listCar
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["common"];
  params: {lang: Locale};
  listCar: ListCar
}) {
  const router = useRouter()
  const [listCarRecommend, setListCarRecommend] = useState<DataCardCar[]>([])

  useEffect(() => {
    setListCarRecommend(listCar.items)
  }, [])
  
  return (
    <div className="1xl:w-[1312px] mx-auto pb-[32px] xs:px-[24px] 1xl:px-0">
      <div className="flex justify-between h-[44px] sm:px-[20px]">
        <p className="text-[#90A3BF] text-[16px] font-semibold">
          {dictionary.titleRecommendationCar}
        </p>
        <p onClick={() => router.push(`/${params.lang}/category`)} className="text-[#90A3BF] text-[16px] !text-[#3563E9] font-semibold cursor-pointer">
          {dictionary.viewAll}
        </p>
      </div>
      <div className="xs:hidden sm:grid 1xl:grid-cols-4 lg:grid-cols-3 ml:grid-cols-2 xs:grid-cols-1 gap-8 justify-items-center">
        {listCarRecommend?.map((item, index) => (
          <CardCar list={item} key={item.id + index} dictionary={dictionary} params={params}/>
        ))}
      </div>

      <div className="sm:hidden xs:flex justify-between gap-[22px] overflow-x-auto no-scrollbar">
        {listCarRecommend?.map((item, index) => (
          <CardCar list={item} key={item.id + index} dictionary={dictionary} params={params}/>
        ))}
      </div>
    </div>
  );
}
