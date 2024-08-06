/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import CardCar from "../CardCar";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { DataCardCar } from "@/types/product";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function RecentCarDetail({
  dictionary,
  params,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["common"];
  params: { lang: Locale };
}) {
  const router = useRouter()
  const [listCarRecent, setListCarRecent] = React.useState<any[]>([]);

  const recentCar = getCookie("recent_car");

  React.useEffect(() => {
    if (recentCar) {
      const arr = [];
      arr.push(JSON.parse(recentCar));
      setListCarRecent(arr);
    }
  }, [recentCar]);

  const listCar = listCarRecent[0] && listCarRecent[0].length > 4 ? listCarRecent[0]?.slice(0, 4) : listCarRecent[0]

  return (
    <div>
      {listCarRecent.length > 0 ? (
        <div className="1xl:w-[1312px] m-auto pb-[32px] xs:px-[24px] 1xl:px-0">
          <div className="flex justify-between h-[44px] sm:px-[20px]">
            <p className="text-[#90A3BF] text-[16px] font-semibold">
              {dictionary.titleRecentCar}
            </p>
            <p onClick={() => router.push(`/${params.lang}/category`)} className="text-[#90A3BF] text-[16px] !text-[#3563E9] font-semibold cursor-pointer">
              {dictionary.viewAll}
            </p>
          </div>
          <div className="xs:hidden sm:grid 1xl:grid-cols-4 lg:grid-cols-3 ml:grid-cols-2 xs:grid-cols-1 gap-8 justify-items-center">
            {listCar?.map((item: DataCardCar, index: number) => (
              <CardCar
                list={item}
                key={item.id + index}
                dictionary={dictionary}
                params={params}
              />
            ))}
          </div>

          <div className="sm:hidden xs:flex justify-between gap-[22px] overflow-x-auto no-scrollbar">
            {listCar?.map((item: DataCardCar, index: number) => (
              <CardCar
                list={item}
                key={item.id + index}
                dictionary={dictionary}
                params={params}
              />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
