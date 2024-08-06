/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import { getDictionary } from "@/get-dictionary";
import { Controller } from "react-hook-form";

const styleSelect = {
  minWidth: { xs: "100px", sm: "180px" },
  "& .MuiInputBase-root": {
    background: "transparent",
    pt: "-8px",
    fontSize: "12px",
  },
  "& .MuiSelect-select": {
    pl: 0,
    pt: 2,
  },
  "& .MuiInputBase-root::before": {
    borderBottom: "0",
  },
  "& .MuiFormControl-root": {
    mt: "9px",
  },
  "& .MuiFormLabel-root": {
    pt: "8px",
  },
};

const styleDatePicker = {
  "& .MuiFormControl-root": {
    minWidth: 0,
  },
  "& .MuiInputBase-root": {
    width: { xs: "150px", sm: "180px" },
    fontSize: "12px",
    backgroundColor: "#FFFFFF",
  },
  "& .MuiInputBase-root::before": {
    borderBottom: "0",
  },
  "& .MuiInputBase-input": {
    pl: 0,
    pt: 2,
  },
  "& .MuiButtonBase-root": {
    pb: "4px",
  },
};

const FilterPickAndDrop = ({
  title,
  dictionary,
  control,
  watch,
}: {
  title: string;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["common"];
  control: any;
  watch: any;
}) => {

  const todayNow = new Date();

  return (
    <>
      <div className="xs:px-[24px] lg:px-[48px] py-[24px] bg-white w-full rounded-[10px]">
        <div className="mb-[16px] flex items-center">
          {title === dictionary.pickUp && (
            <div className="w-4 h-4 flex justify-center items-center bg-[#3563E94D] rounded-[50%]">
              <div className="w-2 h-2 bg-[#3563E9] rounded-[50%]"></div>
            </div>
          )}
          {title === dictionary.dropOff && (
            <div className="w-4 h-4 flex justify-center items-center bg-[#5CAFFC4D] rounded-[50%]">
              <div className="w-2 h-2 bg-[#54A6FF] rounded-[50%]"></div>
            </div>
          )}
          <p className="ml-[8px] text-[16px] font-semibold">{title}</p>
        </div>
        <div className="flex justify-between gap-[10px]">
          <div>
            <p className="text-[16px] font-bold">{dictionary.location}</p>
            <div>
              {title === dictionary.pickUp ? (
                <Controller
                  name="pickup_location_id"
                  control={control}
                  render={({ field }) => (
                    <FormControl variant="filled" sx={styleSelect}>
                      <Select
                        sx={{
                          "& .MuiSvgIcon-root": {
                            mt: 0.5,
                          },
                        }}
                        value={watch('pickup_location_id')}
                        onChange={(e) => field.onChange(e)}
                        displayEmpty
                        renderValue={
                          watch('pickup_location_id') !== ""
                            ? undefined
                            : () => (
                                <div className="text-[#aaa] text-[12px]">
                                  {dictionary.selectYourCity}
                                </div>
                              )
                        }
                        IconComponent={KeyboardArrowDownIcon}
                      >
                        <MenuItem value={"1"}>{dictionary.danang}</MenuItem>
                        <MenuItem value={"2"}>{dictionary.quangnam}</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              ) : (
                <Controller
                  name="dropoff_location_id"
                  control={control}
                  render={({ field }) => (
                    <FormControl variant="filled" sx={styleSelect}>
                      <Select
                        sx={{
                          "& .MuiSvgIcon-root": {
                            mt: 0.5,
                          },
                        }}
                        value={watch('dropoff_location_id')}
                        onChange={(e) => field.onChange(e)}
                        displayEmpty
                        renderValue={
                          watch('dropoff_location_id') !== ""
                            ? undefined
                            : () => (
                                <div className="text-[#aaa] text-[12px]">
                                  {dictionary.selectYourCity}
                                </div>
                              )
                        }
                        IconComponent={KeyboardArrowDownIcon}
                      >
                        <MenuItem value={"1"}>{dictionary.danang}</MenuItem>
                        <MenuItem value={"2"}>{dictionary.quangnam}</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              )}
            </div>
          </div>
          <div className="w-[1px] border-[1px] border-[#C3D4E966]"></div>
          <div>
            <p className="text-[16px] font-bold">{dictionary.date}</p>
            <div>
              {title === dictionary.pickUp ? (
                <Controller
                  name="pickup_date"
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={styleDatePicker}
                        format="DD/MM/YYYY"
                        minDate={dayjs(todayNow)}
                        maxDate={dayjs(watch("dropoff_date"))}
                        value={watch('pickup_date') ? dayjs(watch('pickup_date')) : dayjs(todayNow)}
                        onChange={(e) => field.onChange(e)}
                        slots={{
                          openPickerIcon: KeyboardArrowDownIcon,
                        }}
                        slotProps={{
                          textField: {
                            variant: "filled",
                            placeholder: `${dictionary.selectYourDate}`,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              ) : (
                <Controller
                  name="dropoff_date"
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={styleDatePicker}
                        format="DD/MM/YYYY"
                        minDate={watch("pickup_date") ? dayjs(watch("pickup_date")) : dayjs(todayNow)}
                        value={watch('dropoff_date') ? dayjs(watch('dropoff_date')) : dayjs(watch('pickup_date'))}
                        onChange={(e) => field.onChange(e)}
                        slots={{
                          openPickerIcon: KeyboardArrowDownIcon,
                        }}
                        slotProps={{
                          textField: {
                            variant: "filled",
                            placeholder: `${dictionary.selectYourDate}`,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPickAndDrop;
