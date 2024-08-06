"use client";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { RootState } from "@/redux/store";
import { CarDetail } from "@/types/product";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ProductCarDetail({
  dictionary,
  car_id,
  productCarDetail,
  lang,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["common"];
  car_id: string;
  lang: Locale;
  productCarDetail: CarDetail;
}) {
  const router = useRouter();
  const [imageActive, setImageActive] = useState<number>(1);
  const [imageSlider, setImageSlider] = useState<string>();
  const [imageTitle, setImageTitle] = useState<string>();
  const [imageContent, setImageContent] = useState<string>();
  const { dataPickUpAndDropOff } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (productCarDetail) {
      setImageSlider(productCarDetail?.images[0]?.image_url);
      setImageTitle(productCarDetail?.images[0]?.title);
      setImageContent(productCarDetail?.images[0]?.content);
    }
  }, [productCarDetail]);

  const redirectPayment = () => {
    router.push(
      `/${lang}/payment?cars_id=${car_id}${dataPickUpAndDropOff?.pickup_location_id ? `&pickup_location_id=${dataPickUpAndDropOff.pickup_location_id}` : ""}${dataPickUpAndDropOff?.pickup_date ? `&pickup_date=${dataPickUpAndDropOff.pickup_date}` : ""}${dataPickUpAndDropOff?.dropoff_location_id ? `&dropoff_location_id=${dataPickUpAndDropOff.dropoff_location_id}`: ""}${dataPickUpAndDropOff?.dropoff_date ? `&dropoff_date=${dataPickUpAndDropOff.dropoff_date}` : ""}`
    );
  };

  return (
    <div>
      <div className="flex mh:flex-row xs:flex-col gap-8 xs:px-[24px] 1xl:px-0 pb-[32px]">
        {/* Slider Image */}
        <div className="mh:w-[50%] h-fit">
          <div className="relative">
            <div className="absolute left-[24px] top-[24px] xs:max-w-[240px] sm:max-w-[372px]">
              <p className="xs:text-[16px] sm:text-[26px] text-white font-semibold xs:leading-[24px] sm:leading-[48px]">
                {imageTitle}
              </p>
              <p className="mt-[16px] xs:text-[12px] sm:text-[16px] text-white font-medium xs:leading-[15px] sm:leading-[24px]">
                {imageContent}
              </p>
            </div>
            <img
              src={imageSlider}
              alt=""
              className="w-full xs:h-[232px] xm:h-[360px] sm:h-[430px] md:h-[500px] mh:h-[380px] lx:h-[400px] 1xl:h-[450px] rounded-[10px]"
            />
          </div>
          <div className="mt-[24px] flex justify-between sm:gap-6">
            {productCarDetail?.images.map((item, index) => (
              <div
                key={index}
                className={`w-[33%] xs:p-[4px] rounded-[10px] cursor-pointer ${imageActive === index + 1 ? "sm:p-[8px] border-[2px] border-solid border-[#3563E9]" : ""}`}
                onClick={() => {
                  setImageSlider(item.image_url);
                  setImageTitle(item.title);
                  setImageContent(item.content);
                  setImageActive(index + 1);
                }}
              >
                <img
                  src={item.image_url}
                  alt="car detail"
                  className={`w-full ${imageActive === index + 1 ? "xs:h-[64px] xm:h-[100px] sm:h-[108px] ml:h-[150px] mh:h-[94px] lg:h-[114px] lm:h-[136px]" : "xs:h-[64px] xm:h-[106px] sm:h-[124px] ml:h-[156px] mh:h-[108px] lg:h-[130px] lm:h-[148px]"} rounded-[10px]`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Car Detail */}
        <div className="mh:w-[50%] h-fit p-[24px] bg-[#FFFFFF] rounded-[10px]">
          <div className="mb-[32px]">
            <p className="xs:text-[20px] sm:text-[32px] text-[#1A202C] sm:leading-[48px] xs:leading-[30px] font-bold">
              {productCarDetail?.name}
            </p>
            <div className="flex items-center gap-1">
              <Rating name="read-only" value={4} readOnly />
              <p className="xs:text-[12px] sm:text-[14px] text-[#596780] font-medium">
                440+ {dictionary.reviewer}
              </p>
            </div>
          </div>
          <p className="xs:text-[12px] sm:text-[20px] text-[#596780] sm:leading-[40px] xs:leading-[24px] font-normal">
            {productCarDetail?.description}
          </p>
          <div className="mt-[32px] flex justify-between lg:gap-[44px] mh:gap-[28px] sm:gap-[68px] xs:gap-[24px]">
            <div className="w-[50%]">
              <div className="mb-[16px] flex justify-between">
                <p className="xs:text-[12px] sm:text-[20px] text-[#90A3BF] sm:leading-[30px] xs:leading-[15px] font-normal">
                  {dictionary.typeCar}
                </p>
                <p className="xs:text-[12px] sm:text-[20px] text-[#596780] sm:leading-[30px] xs:leading-[15px] font-semibold">
                  {productCarDetail?.car_type}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="xs:text-[12px] sm:text-[20px] text-[#90A3BF] sm:leading-[30px] xs:leading-[15px] font-normal">
                  {dictionary.steering}
                </p>
                <p className="xs:text-[12px] sm:text-[20px] text-[#596780] sm:leading-[30px] xs:leading-[15px] font-semibold">
                  {productCarDetail?.steering}
                </p>
              </div>
            </div>
            <div className="w-[50%]">
              <div className="mb-[16px] flex justify-between">
                <p className="xs:text-[12px] sm:text-[20px] text-[#90A3BF] sm:leading-[30px] xs:leading-[15px] font-normal">
                  {dictionary.capacity}
                </p>
                <p className="xs:text-[12px] sm:text-[20px] text-[#596780] sm:leading-[30px] xs:leading-[15px] font-semibold">
                  {productCarDetail?.capacity} {dictionary.person}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="xs:text-[12px] sm:text-[20px] text-[#90A3BF] sm:leading-[30px] xs:leading-[15px] font-normal">
                  {dictionary.gasoline}
                </p>
                <p className="xs:text-[12px] sm:text-[20px] text-[#596780] sm:leading-[30px] xs:leading-[15px] font-semibold">
                  {productCarDetail?.gasoline}L
                </p>
              </div>
            </div>
          </div>

          {/* Price and Button */}
          <div className="flex justify-between items-center mt-[68px]">
            <div>
              <p className="xs:text-[20px] sm:text-[28px] text-[#1A202C] font-bold xs:leading-[25px] sm:leading-[35px]">
                $
                {productCarDetail?.sale_price
                  ? productCarDetail?.sale_price
                  : productCarDetail?.price}{" "}
                /{" "}
                <span className="font-bold xs:text-[12px] sm:text-[16px] text-[#90A3BF] xs:leading-[15px] sm:leading-[20px]">
                  {dictionary.day}
                </span>
              </p>
              {productCarDetail?.sale_price && (
                <p className="mt-1 font-bold xs:text-[12px] sm:text-[16px] text-[#90A3BF] xs:leading-[15px] sm:leading-[20px] line-through">
                  ${productCarDetail?.price}
                </p>
              )}
            </div>
            <button
              onClick={redirectPayment}
              className="text-[16px] text-white font-semibold bg-[#3563E9] xs:px-[16px] xs:py-[8px] sm:px-[32px] sm:py-[16px] rounded-[5px] hover:bg-[#54A6FF] normal-case"
            >
              {dictionary.rentalNow}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
