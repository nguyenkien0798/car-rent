'use client'

import { Locale } from "@/i18n-config";
import CardCar from "../CardCar";
import { getDictionary } from "@/get-dictionary";
import { useRouter } from "next/navigation";
import { ListCar } from "@/types/product";

export default function PopularCar({
  dictionary,
  params,
  listCar
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["common"];
  params: {lang: Locale}
  listCar: ListCar
}) {
  const router = useRouter()

  return (
    <div className=" 1xl:w-[1312px] m-auto pt-[32px] xs:px-[24px] 1xl:px-0">
      <div className="flex justify-between h-[44px] sm:px-[20px]">
        <p className="text-[#90A3BF] text-[16px] font-semibold">
          {dictionary.titlePopularCar}
        </p>
        <p onClick={() => router.push(`/${params.lang}/category`)} className="text-[#90A3BF] text-[16px] !text-[#3563E9] font-semibold cursor-pointer">
          {dictionary.viewAll}
        </p>
      </div>
      <div className="xs:hidden sm:grid 1xl:grid-cols-4 lg:grid-cols-3 ml:grid-cols-2 xs:grid-cols-1 gap-8 xs:justify-items-center ">
        {listCar?.items?.map((item, index) => (
          <CardCar list={item} key={item.id + index} dictionary={dictionary} params={params}/>
        ))}
      </div>

      <div className="sm:hidden xs:flex justify-between gap-[22px] overflow-x-auto no-scrollbar">
        {listCar?.items?.map((item, index) => (
          <CardCar list={item} key={item.id + index} dictionary={dictionary} params={params}/>
        ))}
      </div>
    </div>
  );
}
