"use client";

import React, { useEffect } from "react";
import FilterPickAndDrop from "../FilterPickAndDrop";
import { getDictionary } from "@/get-dictionary";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { saveDataPickUpAndDropOff } from "@/redux/slice/product";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n-config";
import { useForm } from "react-hook-form";
import { RootState } from "@/redux/store";

interface PickUpAndDropOff {
  pickup_location_id: string;
  pickup_date: string;
  dropoff_location_id: string;
  dropoff_date: string;
}

export default function FilterFindCar({
  dictionary,
  params,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["common"];
  params: Locale;
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { control, watch, setValue } = useForm<PickUpAndDropOff>({
    defaultValues: {
      pickup_location_id: "",
      pickup_date: "",
      dropoff_location_id: "",
      dropoff_date: "",
    },
    mode: "all",
  });
  
  const todayNow = new Date()
  const { dataPickUpAndDropOff } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (dataPickUpAndDropOff?.pickup_location_id) {
      setValue('pickup_location_id', dataPickUpAndDropOff.pickup_location_id)
    }
    if (dataPickUpAndDropOff?.pickup_date) {
      setValue('pickup_date', dataPickUpAndDropOff.pickup_date)
    } else {
      setValue('pickup_date', dayjs(todayNow).toString())
    }
    if (dataPickUpAndDropOff?.dropoff_location_id) {
      setValue('dropoff_location_id', dataPickUpAndDropOff.dropoff_location_id)
    }
    if (dataPickUpAndDropOff?.dropoff_date) {
      setValue('dropoff_date', dataPickUpAndDropOff.dropoff_date)
    } else {
      setValue('dropoff_date', dayjs(watch('pickup_date')).toString())
    }
  }, [dataPickUpAndDropOff])

  const handleFindCar = () => {
    const paramsUrl = `${watch("pickup_location_id") ? `pickup_location_id=${watch("pickup_location_id")}` : ""}${watch("pickup_date") ? `&pickup_date=${dayjs(watch("pickup_date")).toISOString()}` : `&pickup_date=${dayjs(todayNow).toISOString()}`}${watch("dropoff_location_id") ? `&dropoff_location_id=${watch("dropoff_location_id")}` : ""}${watch("dropoff_date") ? `&dropoff_date=${dayjs(watch("dropoff_date")).toISOString()}` : `&dropoff_date=${dayjs(todayNow).toISOString()}`}`;
    if (watch('pickup_location_id') || watch('pickup_date') || watch('dropoff_location_id') || watch('dropoff_date')) {
      dispatch(
        saveDataPickUpAndDropOff({
          pickup_location_id: watch("pickup_location_id") ? watch("pickup_location_id") : "",
          pickup_date: watch("pickup_date") ? dayjs(watch("pickup_date")).toString() : "",
          dropoff_location_id: watch("dropoff_location_id") ? watch("dropoff_location_id") : "",
          dropoff_date: watch("dropoff_date") ? dayjs(watch("dropoff_date")).toString() : ""
        })
      );
    }

    router.push(`/${params}/category?${paramsUrl}`, { scroll: true });
  };

  return (
    <div className="1xl:w-[1312px] h-[120px] m-auto lg:mt-[130px] mh:mt-[150px] xs:mt-[50px] sm:mt-[180px] xs:mb-[320px] sm:mb-[180px] mh:mb-[50px] lg:mb-[32px]">
      <div className="relative 1xl:w-[1312px] h-[120px] m-auto xs:mx-[24px] 1xl:mx-0 mh:bg-[#D9D9D929] xs:bg-transparent rounded-[10px] mh:shadow-filter">
        <div className="sm:absolute sm:left-[50%] sm:top-[-50%] sm:translate-y-[-25%] sm:translate-x-[-50%] flex xs:flex-col mh:flex-row xs:gap-10 justify-center 1xl:gap-[32px] xl:gap-10 lg:gap-10`">
          <div className="1xl:w-[582px] xl:w-[530px] lx:w-[505px] lg:w-[430px] mh:w-[430px] sm:w-[600px] xs:w-full">
            <FilterPickAndDrop
              title={dictionary.pickUp}
              dictionary={dictionary}
              control={control}
              watch={watch}
            />
          </div>
          <div className="1xl:w-[582px] xl:w-[530px] lx:w-[505px] mh:w-[430px] xs:w-full">
            <FilterPickAndDrop
              title={dictionary.dropOff}
              dictionary={dictionary}
              control={control}
              watch={watch}
            />
          </div>
        </div>
        <div className="xs:mt-[32px] lg:mt-0">
          <button
            onClick={handleFindCar}
            className="xs:w-full sm:w-[400px] absolute sm:left-[50%] sm:top-[210%] sm:translate-y-[-25%] sm:translate-x-[-50%] mh:left-[50%] mh:top-[90%] mh:translate-y-[-25%] mh:translate-x-[-50%] rounded-[4px] 
              w-[400px] bg-[#3563E9] text-white font-semibold py-[8px] hover:bg-[#54A6FF] normal-case"
          >
            {dictionary.findCar}
          </button>
        </div>
      </div>
    </div>
  );
}
