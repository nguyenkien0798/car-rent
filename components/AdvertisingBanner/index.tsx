import React from "react";
import Image from "next/image";
import CarLeft from "/public/images/rental_car_1.png";
import CarRight from "/public/images/rental_car_2.png";
import bgRentalCarLeft from "../../public/images/bg_rental_car_1.png";
import bgRentalCarRight from "../../public/images/bg_rental_car_2.png";
import { getDictionary } from "@/get-dictionary";

const AdvertisingBanner = ({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["banner"];
}) => {
  return (
    <div className="2xl:max-w-[1312px] 1xl:max-w:[1312px] mx-auto">
      <div className="flex gap-8 1xl:w-full xs:px-[24px] 1xl:px-0">
        <div
          className={`flex relative flex-col mx-auto justify-start items-start rounded-lg p-6 min-w-[312px] min-h-[232px] sm:w-[640px] sm:h-[360px] xs:w-full last:hidden last:md:flex`}
          style={{ backgroundImage: `url(${bgRentalCarLeft.src})` }}
        >
          <div className="xs:w-62 sm:w-60 sm:w-72 text-white mb-4">
            <p className="text-base sm:text-3xl tracking-[-0.32px] sm:tracking-[-0.96px] font-semibold leading-6 sm:leading-[48px] mb-3 sm:mb-4">
              {dictionary.titleRentalCarLeft}
            </p>
            <p className="text-xs sm:text-base font-medium leading-5 sm:leading-6 ">
              {dictionary.contentRentalCarLeft}
            </p>
          </div>

          {/* Button rent now */}
          <button className="w-[140px] text-white bg-[#3563E9] px-[20px] py-[10px] rounded-[5px] hover:bg-[#54A6FF]">
            {dictionary.rentalCar}
          </button>

          {/* Image car */}
          <div className="absolute xs:bottom-0 md:bottom-[5%] left-1/2 translate-x-[-40%] object-contain w-[196px] h-[56px] sm:w-auto sm:h-auto">
            <Image src={CarLeft} width={406} height={116} alt="image car" />
          </div>
        </div>

        {/* Banner Right */}
        <div
          className={`flex relative flex-col mx-auto justify-start items-start rounded-lg p-6 min-w-[312px]  min-h-[232px] sm:w-[640px] sm:h-[360px] last:hidden last:md:flex`}
          style={{ backgroundImage: `url(${bgRentalCarRight.src})` }}
        >
          <div className="w-60 sm:w-72 text-white mb-5">
            <p className="text-base sm:text-3xl tracking-[-0.32px] sm:tracking-[-0.96px] font-semibold leading-6 sm:leading-[48px] mb-3 sm:mb-4">
              {dictionary.titleRentalCarRight}
            </p>
            <p className="text-xs sm:text-base font-medium leading-5 sm:leading-6 ">
              {dictionary.contentRentalCarRight}
            </p>
          </div>

          {/* Button rent now */}
          <button className="w-[140px] text-white bg-[#54A6FF] px-[20px] py-[10px] rounded-[5px] hover:bg-[#3563E9]">
            {dictionary.rentalCar}
          </button>

          {/* Image car */}
          <div className="absolute bottom-[5%] left-1/2 translate-x-[-40%] object-contain w-[196px] h-[56px] sm:w-auto sm:h-auto">
            <Image src={CarRight} width={406} height={116} alt="image car" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisingBanner;
