"use client";

import React from "react";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { getDictionary } from "@/get-dictionary";

interface ListType {
  id: number;
  name: string;
  total: number;
}

const SidebarFilter = ({
  list,
  dictionary,
  onChangeValue,
  typeFilter,
  isSearchFilter,
  checked,
}: {
  list?: ListType[];
  dictionary?: Awaited<ReturnType<typeof getDictionary>>["common"];
  onChangeValue: (checked: boolean, name: string) => void;
  typeFilter: string;
  isSearchFilter?: boolean;
  checked?: string[];
}) => {
  
  return (
    <div className="">
      <FormGroup>
        {list?.map((item, index) => (
          <div
            key={index}
            className={`${index === 0 ? "h-[24px] flex items-center" : "xs:mt-[16px] mh:mt-[32px] h-[24px] flex items-center"}`}
          >
            <Checkbox
              sx={{
                width: "24px",
                height: "24px",
                mr: "8px"
              }}
              name={typeFilter === "type" ? item.id.toString() : item.name.toString()}
              checked={typeFilter === "type" ? checked?.includes(item.id.toString()) : checked?.includes(item.name.toString())}
              onChange={(e, val) => onChangeValue(val, e.target.name)}
            />
            <p
              className={`${isSearchFilter ? "xs:text-[12px] sm:text-[16px]" : "xs:text-[16px] sm:text-[20px]"} mr-1  text-[#596780] font-semibold leading-[30px]`}
            >
              {typeFilter === "type"
                ? item.name
                : item.name + ` ${dictionary?.person}`}
            </p>
            <p
              className={`${isSearchFilter ? "xs:text-[12px] sm:text-[16px] text-[#90A3BF]" : "text-[20px] text-[#90A3BF]"}`}
            >{`(${item.total})`}</p>
          </div>
        ))}
      </FormGroup>
    </div>
  );
};

export default SidebarFilter;
