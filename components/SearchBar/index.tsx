/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { IconButton, Popover, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FilterIcon from "/public/images/filter.svg";
import { getDictionary } from "@/get-dictionary";
import SidebarFilter from "../SidebarFilter";
import SliderPrice from "../SliderPrice";
import { FilterTag } from "@/types/product";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Locale } from "@/i18n-config";

const styleInput = {
  "& .MuiInputBase-root": {
    borderRadius: "30px",
    padding: "12px",
    paddingRight: '48px',
    border: '1px solid #C3D4E966'
  },
  "& .MuiInputBase-input": {
    padding: 0,
  },
};

const SearchBar = ({
  dictionary,
  filter,
  params,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  filter?: FilterTag;
  params: Locale;
}) => {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const capacities = searchParams.get('capacities')
  const type_ids = searchParams.get('type_ids')
  const max_price = searchParams.get('max_price')
  const router = useRouter();
  const pathName = usePathname();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [valueCheckBoxType, setValueCheckBoxType] = useState<string[]>([]);
  const [valueCheckBoxCapacity, setValueCheckBoxCapacity] = useState<string[]>(
    []
  );
  const [priceFilter, setPriceFilter] = useState<string | string[]>([]);
  const [valueInput, setValueInput] = useState<string>();

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (pathName !== `/${params}/category`) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    if (search) {
      setValueInput(search)
    }
  }, [search])

  useEffect(() => {
    if (pathName !== `/${params}/category`) {
      setValueCheckBoxCapacity([])
      setValueCheckBoxType([])
      setPriceFilter('')
      setValueInput('')
    }
  }, [pathName])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeValueCheckBoxCapacity = (
    checked: boolean,
    name: string
  ) => {
    if (checked) {
      setValueCheckBoxCapacity([...valueCheckBoxCapacity, name]);
    } else {
      const arr = valueCheckBoxCapacity.filter((item) => !item.includes(name));
      setValueCheckBoxCapacity(arr);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeValueCheckBoxType = (checked: boolean, name: string) => {
    if (checked) {
      setValueCheckBoxType([...valueCheckBoxType, name]);
    } else {
      const arr = valueCheckBoxType.filter((item) => !item.includes(name));
      setValueCheckBoxType(arr);
    }
  };

  const handleChangeCommited = (
    event: React.SyntheticEvent | Event,
    newValue: string
  ) => {
    setPriceFilter(newValue);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnKeyDown = (e: any) => {
    if (e.key === "Enter") {  
      router.push(
        `/${params}/category?${valueInput ? `search=${valueInput}` : ""}${capacities ? `&capacities=${capacities}` : ""}${type_ids ? `&type_ids=${type_ids}`: ""}${max_price ? `&max_price=${max_price}` : ""}`
      );
    }
  };

  const handleSubmitFilter = useCallback(() => {
    router.push(
      `/${params}/category?capacities=${valueCheckBoxCapacity}&type_ids=${valueCheckBoxType}${valueInput ? `&search=${valueInput}` : ""}${priceFilter ? `&max_price=${priceFilter}` : ""}`,
      { scroll: false }
    );
    handleClose();
  }, [valueCheckBoxType, valueCheckBoxCapacity, priceFilter, valueInput]);

  return (
    <div className="relative xs:w-full ml:w-[350px] lg:w-[492px] xs:px-6 sm:px-0 flex xs:justify-between xs:gap-4 sm:gap-0">
      <TextField
        sx={styleInput}
        value={valueInput}
        fullWidth
        placeholder={dictionary.header.placeholderSearch}
        onChange={(e) => setValueInput(e.target.value)}
        onKeyDown={handleOnKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          // endAdornment: (
          //   <InputAdornment className="xs:hidden sm:block" position="end">
          //     <IconButton className="xs:hidden sm:block" onClick={handleOpenPopover}>
          //       <Image
          //         className="xs:hidden sm:block"
          //         src={FilterIcon}
          //         alt="filter-icon"
          //         width={24}
          //         height={24}
          //       />
          //     </IconButton>
          //   </InputAdornment>
          // ),
        }}
        variant="outlined"
      />
      <div className="absolute right-[10px] hd:hidden sm:flex justify-center w-[48px] h-[48px] sm:border-0 xs:border-[1px] xs:border-solid xs:border-[#C3D4E966] rounded-[10px] cursor-pointer">
        <IconButton onClick={handleOpenPopover}>
          <Image
            src={FilterIcon}
            alt="filter-icon"
            width={24}
            height={24}
          />
        </IconButton>
      </div>
      <div className="xs:flex sm:hidden justify-center w-[48px] h-[48px] sm:border-0 xs:border-[1px] xs:border-solid xs:border-[#C3D4E966] rounded-[10px] cursor-pointer">
        <IconButton sx={{ width: '48px' }} onClick={handleOpenPopover}>
          <Image
            src={FilterIcon}
            alt="filter-icon"
            width={24}
            height={24}
          />
        </IconButton>
      </div>
      <Popover
        sx={{ mt: 1 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="w-fit p-6">
          <div className="flex justify-between gap-2">
            <div>
              <p className="mb-[20px] text-[12px] font-semibold text-[#90A3BF]">
                {dictionary.common.type}
              </p>
              <SidebarFilter
                list={filter?.types}
                onChangeValue={handleChangeValueCheckBoxType}
                typeFilter="type"
                isSearchFilter={true}
              />
            </div>

            <div>
              <p className="mb-[20px] text-[12px] font-semibold text-[#90A3BF]">
                {dictionary.common.capacity}
              </p>
              <SidebarFilter
                list={filter?.capacities}
                dictionary={dictionary.common}
                onChangeValue={handleChangeValueCheckBoxCapacity}
                typeFilter="capacity"
                isSearchFilter={true}
              />
            </div>
          </div>

          <div className="pr-[32px] mt-[32px]">
            <p className="mb-[20px] text-[12px] font-semibold text-[#90A3BF]">
              {dictionary.common.price}
            </p>
            <SliderPrice
              min={filter?.price_range.min}
              max={filter?.price_range.max}
              handleChangeCommited={handleChangeCommited}
              defaultValue={0}
            />
            <p className="text-[16px] text-[#596780] font-semibold">
              {dictionary.common.max} {filter?.price_range.max}
            </p>
          </div>
          <div className="mt-[16px] flex justify-center">
            <button
              className="px-[20px] py-[6px] text-white font-semibold bg-[#3563E9] rounded-[4px] hover:bg-[#54A6FF]"
              onClick={handleSubmitFilter}
            >
              {dictionary.common.search}
            </button>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default SearchBar;
