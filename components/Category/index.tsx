/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import SidebarFilter from "@/components/SidebarFilter";
import CardCar from "@/components/CardCar";
import { getDictionary } from "@/get-dictionary";
import SliderPrice from "../SliderPrice";
import FilterPickAndDrop from "../FilterPickAndDrop";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getFilterTag, saveDataPickUpAndDropOff } from "@/redux/slice/product";
import { Locale } from "@/i18n-config";
import { useRouter } from "next/navigation";
import { DataCardCar, FilterTag, ListCar } from "@/types/product";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import NoData from "/public/images/no-data.png";

interface PickUpAndDropOff {
  pickup_location_id: string;
  pickup_date: string;
  dropoff_location_id: string;
  dropoff_date: string;
}

export default function Category({
  dictionary,
  params,
  list,
  type_ids,
  capacities,
  max_price,
  search,
  pickup_location_id,
  pickup_date,
  dropoff_location_id,
  dropoff_date,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["common"];
  params: { lang: Locale };
  list: ListCar;
  type_ids: string;
  capacities: string;
  max_price: string;
  search: string;
  pickup_location_id: string;
  pickup_date: string;
  dropoff_location_id: string;
  dropoff_date: string;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { dataPickUpAndDropOff } = useSelector(
    (state: RootState) => state.product
  );
  const [page, setPage] = useState<number>(1);
  const [valueCheckBoxType, setValueCheckBoxType] = useState<string[]>([]);
  const [valueCheckBoxCapacity, setValueCheckBoxCapacity] = useState<string[]>(
    []
  );
  const [totalListCar, setTotalListCar] = useState<number>(
    list?.pagination?.total
  );
  const [listCarCategory, setListCarCategory] = useState<DataCardCar[]>(
    list?.items
  );
  const [priceMax, setPriceMax] = useState<number>(0);
  const [listFilterTag, setListFilterTag] = useState<FilterTag>();

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  const { control, watch, setValue } = useForm<PickUpAndDropOff>({
    defaultValues: {
      pickup_location_id: "",
      pickup_date: "",
      dropoff_location_id: "",
      dropoff_date: "",
    },
    mode: "all",
  });

  const todayNow = new Date();
  const urlAPI = process.env.NEXT_PUBLIC_URL_API;
  const paramsUrl = `${pickup_location_id ? `&pickup_location_id=${pickup_location_id}` : ""}${pickup_date ? `&pickup_date=${dayjs(pickup_date).toISOString()}` : ""}${dropoff_location_id ? `&dropoff_location_id=${dropoff_location_id}` : ""}${dropoff_date ? `&dropoff_date=${dayjs(dropoff_date).toISOString()}` : ""}`;
  const paramsUrlPickUpAndDropOff = `${pickup_location_id ? `&pickup_location_id=${pickup_location_id}` : ""}${pickup_date ? `&pickup_date=${dayjs(pickup_date).format("MM/DD/YYYY")}` : ""}${dropoff_location_id ? `&dropoff_location_id=${dropoff_location_id}` : ""}${dropoff_date ? `&dropoff_date=${dayjs(dropoff_date).format("MM/DD/YYYY")}` : ""}`;

  useEffect(() => {
    if (pickup_location_id) {
      setValue("pickup_location_id", pickup_location_id);
    }
    if (pickup_date) {
      setValue("pickup_date", dayjs(pickup_date).toString());
    }
    if (dropoff_location_id) {
      setValue("dropoff_location_id", dropoff_location_id);
    }
    if (dropoff_date) {
      setValue("dropoff_date", dayjs(dropoff_date).toString());
    } else {
      setValue("dropoff_date", dayjs(todayNow).toString());
    }
  }, [pickup_date, pickup_location_id, dropoff_date, dropoff_location_id]);

  useEffect(() => {
    if (
      pickup_location_id ||
      pickup_date ||
      dropoff_location_id ||
      dropoff_date
    ) {
      dispatch(
        saveDataPickUpAndDropOff({
          pickup_location_id: pickup_location_id ? pickup_location_id : "",
          pickup_date: pickup_date ? pickup_date : "",
          dropoff_location_id: dropoff_location_id ? dropoff_location_id : "",
          dropoff_date: dropoff_date ? dropoff_date : "",
        })
      );
    }
  }, [pickup_location_id, pickup_date, dropoff_location_id, dropoff_date]);

  useEffect(() => {
    dispatch(getFilterTag());
    getFilter();
  }, [params.lang, capacities, type_ids, max_price]);

  useEffect(() => {
    if (type_ids) {
      setValueCheckBoxType(type_ids.split(","));
    }
    if (capacities) {
      setValueCheckBoxCapacity(capacities.split(","));
    }
  }, [capacities, type_ids]);

  useEffect(() => {
    setListCarCategory([]);
    setTotalListCar(0);
    getData();
  }, [
    type_ids,
    capacities,
    search,
    max_price,
    pickup_date,
    pickup_location_id,
    dropoff_date,
    dropoff_location_id,
  ]);

  useEffect(() => {
    if (page > 1) {
      fetchData();
    }
  }, [page]);

  const getFilter = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const res = await fetch(`${urlAPI}/v1/car-tags`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": `${params.lang === "en" ? "en-US" : "vi"}`,
        },
      });
      const listFilter = await res.json();

      setListFilterTag(listFilter.data);
      setPriceMax(listFilter.data.price_range.max);

      return listFilter.data;
    } catch (error) {
      throw error;
    }
  };

  const getData = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const res = await fetch(
        `${urlAPI}/v1/cars?limit=9&offset=${page}${type_ids ? `&type_ids=${type_ids}` : ""}${capacities ? `&capacities=${capacities}` : ""}${max_price ? `&max_price=${max_price}` : ""}${search ? `&search=${search}` : ""}${pickup_location_id ? `&pickup_location_id=${pickup_location_id}` : ""}${paramsUrlPickUpAndDropOff}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": `${params.lang === "en" ? "en-US" : "vi"}`,
          },
        }
      );
      const list = await res.json();
      setListCarCategory(list.data.items);
      setTotalListCar(list.data.pagination.total);

      return list.data;
    } catch (error) {
      throw error;
    }
  };

  const fetchData = async () => {
    const res = await getData();
    setListCarCategory([...listCarCategory, ...res.items]);
  };

  const handleShowMore = () => {
    setPage(page + 1);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeValueCheckBoxCapacity = (
    checked: boolean,
    name: string
  ) => {
    if (checked) {
      const arrayTemp = [...valueCheckBoxCapacity, name];
      setPage(1);
      setValueCheckBoxCapacity([...valueCheckBoxCapacity, name]);
      router.push(
        `/${params.lang}/category?capacities=${arrayTemp}${type_ids ? `&type_ids=${type_ids}` : ""}${max_price ? `&max_price=${max_price}` : ""}${search ? `&search=${search}` : ""}${paramsUrl}`,
        { scroll: false }
      );
    } else {
      setPage(1);
      const arr = valueCheckBoxCapacity.filter((item) => !item.includes(name));
      setValueCheckBoxCapacity(arr);
      router.push(
        `/${params.lang}/category?capacities=${arr}${type_ids ? `&type_ids=${type_ids}` : ""}${max_price ? `&max_price=${max_price}` : ""}${search ? `&search=${search}` : ""}${paramsUrl}`,
        { scroll: false }
      );
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeValueCheckBoxType = (checked: boolean, name: string) => {
    if (checked) {
      const arrayTemp = [...valueCheckBoxType, name];
      setPage(1);
      setValueCheckBoxType([...valueCheckBoxType, name]);
      router.push(
        `/${params.lang}/category?${arrayTemp ? `type_ids=${arrayTemp}` : ""}${capacities ? `&capacities=${capacities}` : ""}${max_price ? `&max_price=${max_price}` : ""}${search ? `&search=${search}` : ""}${paramsUrl}`,
        { scroll: false }
      );
    } else {
      setPage(1);
      const arr = valueCheckBoxType.filter((item) => !item.includes(name));
      setValueCheckBoxType(arr);
      router.push(
        `/${params.lang}/category?${arr ? `type_ids=${arr}` : ""}${capacities ? `&capacities=${capacities}` : ""}${max_price ? `&max_price=${max_price}` : ""}${search ? `&search=${search}` : ""}${paramsUrl}`,
        { scroll: false }
      );
    }
  };

  const handleChangeCommited = (
    event: React.SyntheticEvent | Event,
    newValue: string
  ) => {
    router.push(
      `/${params.lang}/category?${capacities ? `capacities=${capacities}` : ""}${type_ids ? `&type_ids=${type_ids}` : ""}&max_price=${newValue}${search ? `&search=${search}` : ""}${paramsUrlPickUpAndDropOff}`,
      { scroll: false }
    );
  };

  const handleFindCar = () => {
    const paramsUrl = `${watch("pickup_location_id") ? `&pickup_location_id=${watch("pickup_location_id")}` : ""}${watch("pickup_date") ? `&pickup_date=${dayjs(watch("pickup_date")).toISOString()}` : `&pickup_date=${dayjs(todayNow).toISOString()}`}${watch("dropoff_location_id") ? `&dropoff_location_id=${watch("dropoff_location_id")}` : ""}${watch("dropoff_date") ? `&dropoff_date=${dayjs(watch("dropoff_date")).toISOString()}` : `&dropoff_date=${dayjs(todayNow).toISOString()}`}`;
    if (
      watch("pickup_location_id") ||
      watch("pickup_date") ||
      watch("dropoff_location_id") ||
      watch("dropoff_date")
    ) {
      dispatch(
        saveDataPickUpAndDropOff({
          pickup_location_id: watch("pickup_location_id")
            ? watch("pickup_location_id")
            : "",
          pickup_date: watch("pickup_date")
            ? dayjs(watch("pickup_date")).toString()
            : "",
          dropoff_location_id: watch("dropoff_location_id")
            ? watch("dropoff_location_id")
            : "",
          dropoff_date: watch("dropoff_date")
            ? dayjs(watch("dropoff_date")).toString()
            : "",
        })
      );
    }

    router.push(
      `/${params.lang}/category?${capacities ? `capacities=${capacities}` : ""}${type_ids ? `&type_ids=${type_ids}` : ""}${max_price ? `&max_price=${max_price}` : ""}${search ? `&search=${search}` : ""}${paramsUrl}`,
      { scroll: true }
    );
  };

  const renderSidebarMobile = () => {
    return (
      <div className="w-[240px] h-full bg-white pl-[20px] pt-[32px]">
        <p className="mb-[20px] h-[20px] text-[12px] font-semibold text-[#90A3BF]">
          {dictionary.type}
        </p>
        <SidebarFilter
          list={listFilterTag?.types}
          onChangeValue={handleChangeValueCheckBoxType}
          typeFilter="type"
          checked={valueCheckBoxType}
          isSearchFilter={true}
        />

        <p className="mt-[24px] mb-[28px] h-[20px] text-[12px] font-semibold text-[#90A3BF]">
          {dictionary.capacity}
        </p>
        <SidebarFilter
          list={listFilterTag?.capacities}
          dictionary={dictionary}
          onChangeValue={handleChangeValueCheckBoxCapacity}
          checked={valueCheckBoxCapacity}
          typeFilter="capacity"
          isSearchFilter={true}
        />

        <div className="mt-[24px] pr-[32px] pb-[32px]">
          <p className="mb-[20px] h-[20px] text-[12px] font-semibold text-[#90A3BF]">
            {dictionary.price}
          </p>
          <SliderPrice
            min={listFilterTag?.price_range.min}
            max={listFilterTag?.price_range.max}
            handleChangeCommited={handleChangeCommited}
            defaultValue={priceMax && priceMax}
          />
          <p className="text-[16px] text-[#596780] font-semibold">
            {dictionary.max} ${priceMax}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Sidebar Mobile */}
      <div className="xs:block mh:hidden pl-[24px] pt-[24px]">
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
      </div>
      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        {renderSidebarMobile()}
      </Drawer>
      <div className="flex mh:gap-8">
        <div>
          {/* Sidebar PC*/}
          <div className="mh:block xs:hidden xl:min-w-[360px] lg:min-w-[320px] mh:min-w-[280px] h-full bg-white pl-[28px] pt-[32px]">
            <p className="mb-[28px] h-[20px] text-[12px] font-semibold text-[#90A3BF] uppercase tracking-[2px]">
              {dictionary.type}
            </p>
            <SidebarFilter
              list={listFilterTag?.types}
              onChangeValue={handleChangeValueCheckBoxType}
              typeFilter="type"
              checked={valueCheckBoxType}
            />

            <p className="mt-[56px] mb-[28px] h-[20px] text-[12px] font-semibold text-[#90A3BF] uppercase tracking-[2px]">
              {dictionary.capacity}
            </p>
            <SidebarFilter
              list={listFilterTag?.capacities}
              dictionary={dictionary}
              onChangeValue={handleChangeValueCheckBoxCapacity}
              typeFilter="capacity"
              checked={valueCheckBoxCapacity}
            />

            <div className="pr-[32px] pb-[32px]">
              <p className="mt-[56px] mb-[20px] h-[20px] text-[12px] font-semibold text-[#90A3BF] uppercase tracking-[2px]">
                {dictionary.price}
              </p>
              <SliderPrice
                min={listFilterTag?.price_range.min}
                max={listFilterTag?.price_range.max}
                handleChangeCommited={handleChangeCommited}
                defaultValue={priceMax && priceMax}
              />
              <p className="text-[20px] text-[#596780] font-semibold">
                {dictionary.max} ${priceMax}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[1015px] flex flex-col w-full items-center pt-[32px] pb-[65px] 2xl:pr-0">
          {/* ---------------- Pick-up and Drop-off ---------------- */}
          <div className="xl:mt-[100px] xl:mb-[50px] lg:mt-[140px] lg:mb-[160px] sm:mt-[110px] sm:mb-[160px] xs:mt-0 xs:mb-[300px]">
            <div className="relative 2xl:w-[1025px] 1xl:w-[890px] xl:w-[870px] h-[120px] m-auto xl:bg-[#D9D9D929] xs:bg-transparent rounded-[10px] xl:shadow-filter">
              <div className="sm:absolute sm:left-[50%] sm:top-[-50%] sm:translate-y-[-25%] sm:translate-x-[-50%] flex xs:flex-col xl:flex-row justify-center xs:gap-2 1xl:gap-4">
                <div className="2xl:w-[480px] 1xl:w-[440px] xl:w-[430px] lg:w-[620px] mh:w-[610px] sm:w-[600px] xs:w-full">
                  <FilterPickAndDrop
                    title={dictionary.pickUp}
                    dictionary={dictionary}
                    control={control}
                    watch={watch}
                  />
                </div>
                <div className="2xl:w-[480px] 1xl:w-[440px] xl:w-[430px] lg:w-[620px] mh:w-[610px] sm:w-[600px] xs:w-full">
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
                  className="xs:w-full sm:w-[400px] absolute sm:left-[50%] sm:top-[180%] sm:translate-y-[-25%] sm:translate-x-[-50%] lg:left-[50%] lg:top-[180%] lg:translate-y-[-25%] lg:translate-x-[-50%] xl:top-[90%] rounded-[4px] 
                  w-[400px] bg-[#3563E9] text-white font-semibold py-[8px] hover:bg-[#54A6FF] normal-case"
                >
                  {dictionary.findCar}
                </button>
              </div>
            </div>
          </div>

          {/* -------------- List Car -------------- */}
          {listCarCategory && (
            <div className="w-full grid justify-items-center 2xl:grid-cols-3 1xl:grid-cols-2 lg:grid-cols-2 mh:grid-cols-1 ml:grid-cols-2 xs:grid-cols-1 -mx-4 xs:gap-6 sm:gap-6 mh:gap-8">
              {listCarCategory.map((car, index) => (
                <CardCar
                  list={car}
                  key={car.id + index}
                  dictionary={dictionary}
                  params={params}
                  isListCategory={true}
                />
              ))}
            </div>
          )}

          {/* -------------- Show more button -------------- */}
          <div className="relative w-full mt-[64px] flex justify-center">
            {listCarCategory?.length === 0 ||
            listCarCategory?.length >= totalListCar ? (
              ""
            ) : (
              <button
                className="px-[20px] py-[10px] text-white font-semibold bg-[#3563E9] rounded-[4px] hover:bg-[#54A6FF] normal-case"
                onClick={handleShowMore}
              >
                {dictionary.btnShowMore}
              </button>
            )}
            {listCarCategory?.length === 0 ? (
              ""
            ) : (
              <p className="absolute top-[25%] right-4 text-[14px] text-[#90A3BF]">
                {totalListCar} {dictionary.car}
              </p>
            )}
          </div>

          {listCarCategory?.length === 0 && (
            <div className="mt-[64px]">
              <img src={NoData.src} alt="no-data" />
              <p className="mt-8 text-center text-[18px] font-semibold">
                {dictionary.noData}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
