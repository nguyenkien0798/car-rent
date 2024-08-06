"use client";

import React from "react";
import Image from "next/image";
import ImageCar from "/public/images/car.png";
import ShadowCar from "/public/images/shadow.png";
import Manual from "/public/images/manual.png";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { getDictionary } from "@/get-dictionary";
import { DataCardCar } from "@/types/product";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n-config";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getCookie, setCookie } from "cookies-next";

const CardCar = ({
  list,
  dictionary,
  params,
  isListCategory,
}: {
  list: DataCardCar;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["common"];
  params: { lang: Locale };
  isListCategory?: boolean;
}) => {
  const router = useRouter();
  const { dataPickUpAndDropOff } = useSelector(
    (state: RootState) => state.product
  );

  const redirectPayment = () => {
    router.push(
      `/${params.lang}/payment?cars_id=${list.id}${dataPickUpAndDropOff?.pickup_location_id ? `&pickup_location_id=${dataPickUpAndDropOff.pickup_location_id}` : ""}${dataPickUpAndDropOff?.pickup_date ? `&pickup_date=${dataPickUpAndDropOff.pickup_date}` : ""}${dataPickUpAndDropOff?.dropoff_location_id ? `&dropoff_location_id=${dataPickUpAndDropOff.dropoff_location_id}`: ""}${dataPickUpAndDropOff?.dropoff_date ? `&dropoff_date=${dataPickUpAndDropOff.dropoff_date}` : ""}`
    );
  };

  const recentCar = getCookie('recent_car')

  const handleRedirectCarDetail = () => {   
    if (recentCar) {
      const arr = [...JSON.parse(recentCar)]
      arr.unshift(list)
      setCookie('recent_car', JSON.stringify(arr))
    } else {
      const arrayTemp = []
      arrayTemp.push(list)
      setCookie('recent_car', JSON.stringify(arrayTemp))
    }
    router.push(`/${params.lang}/cars/${list.id}`)
  }

  return (
    <div className="">
      <div
        className={`mh:block xs:hidden p-[24px] ${isListCategory && "1xl:w-[320px]"} ${params.lang === 'vi' ?  "mh:w-[314px]" : "mh:w-[306px]"} h-fit bg-white rounded-[10px]`}
      >
        <div className="flex justify-between">
          <div>
            <p className="text-[16px] font-bold">{list.name}</p>
            <p className="mt-[4px] text-[14px] text-[#90A3BF] font-bold">
              {list.type}
            </p>
          </div>
          <div>
            {Math.random() > 0.5 ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </div>
        </div>
        <div
          onClick={handleRedirectCarDetail}
          className="relative px-[16px] pt-[64px] pb-[50px] cursor-pointer"
        >
          <Image src={list.thumbnail_url} alt="car" width={232} height={72} />
          <Image
            src={ShadowCar}
            alt="car"
            width={232}
            height={72}
            className="absolute bottom-[25%]"
          />
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex items-center">
            <LocalGasStationIcon sx={{ color: "#90A3BF" }} />
            <p className="ml-[6px] font-bold text-[14px] text-[#90A3BF]">
              {list.gasoline}L
            </p>
          </div>
          <div className="flex items-center">
            <Image src={Manual} alt="manual" width={24} height={24} />
            <p className="ml-[6px] font-bold text-[14px] text-[#90A3BF]">
              {list.steering}
            </p>
          </div>
          <div className="flex items-center">
            <PeopleAltIcon sx={{ color: "#90A3BF" }} />
            <p className="ml-[6px] font-bold text-[14px] text-[#90A3BF]">
              {list.capacity} {dictionary.person}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-[42px]">
          <div>
            <p className="text-[16px] font-bold">
              ${list.sale_price ? list.sale_price : list.price} /{" "}
              <span className="font-bold text-[14px] text-[#90A3BF]">
                {dictionary.day}
              </span>
            </p>
            {list.sale_price && (
              <p className="text-[12px] text-[#90A3BF] line-through">
                ${list.price}
              </p>
            )}
          </div>
          <button
            onClick={redirectPayment}
            className="text-[16px] text-white font-semibold bg-[#3563E9] px-[20px] py-[8px] rounded-[5px] hover:bg-[#54A6FF] normal-case"
          >
            {dictionary.rentalNow}
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="mh:hidden xs:block p-[24px] xm:w-[380px] xs:w-[327px] min-h-[240px] bg-white rounded-[10px]">
        <div className="flex justify-between">
          <div>
            <p className="text-[20px] font-bold">{list.name}</p>
            <p className="mt-[4px] text-[14px] text-[#90A3BF] font-bold">
              {list.type}
            </p>
          </div>
          {/* <div>
            {list.favorite ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </div> */}
        </div>
        <div className="flex justify-between">
          {/* ------------Car image------------ */}
          <div
            onClick={handleRedirectCarDetail}
            className="relative px-[16px] pt-[32px] pb-[32px] cursor-pointer"
          >
            <Image src={ImageCar} alt="car" width={142} height={64} />
            <Image
              src={ShadowCar}
              alt="car"
              width={221}
              height={44}
              className="absolute bottom-[25%]"
            />
          </div>
          {/* ------------Car detail------------ */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <LocalGasStationIcon
                sx={{ fontSize: "14px", color: "#90A3BF" }}
              />
              <p className="ml-[6px] font-bold text-[12px] text-[#90A3BF]">
                {list.gasoline}L
              </p>
            </div>
            <div className="flex items-center">
              <Image src={Manual} alt="manual" width={14} height={14} />
              <p className="ml-[6px] font-bold text-[12px] text-[#90A3BF]">
                {list.steering}
              </p>
            </div>
            <div className="flex items-center">
              <PeopleAltIcon sx={{ fontSize: "14px", color: "#90A3BF" }} />
              <p className="ml-[6px] font-bold text-[12px] text-[#90A3BF]">
                {list.capacity} {dictionary.person}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-[32px]">
          <div>
            <p className="text-[16px] font-bold">
              ${list.sale_price ? list.sale_price : list.price} /{" "}
              <span className="font-bold text-[14px] text-[#90A3BF]">
                {dictionary.day}
              </span>
            </p>
            {list.sale_price && (
              <p className="text-[12px] text-[#90A3BF] line-through">
                ${list.price}
              </p>
            )}
          </div>
          <button
            onClick={redirectPayment}
            className="text-[12px] text-white font-semibold bg-[#3563E9] px-[16px] py-[10px] rounded-[5px] hover:bg-[#54A6FF] normal-case"
          >
            {dictionary.rentalNow}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCar;
