/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef } from "react";
import { MenuItem, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getDictionary } from "@/get-dictionary";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

const styleDatePicker = {
  "&.MuiStack-root": {
    pt: 0,
    backgroundColor: "#FFFFFF",
  },
  "& .MuiInputBase-root": {
    borderRadius: "8px !important",
    backgroundColor: "#F6F7F9",
  },
  "& .MuiTextField-root": {
    width: "100%",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& .MuiInputBase-input": {
    fontSize: { xs: "12px", sm: "14px" },
    paddingLeft: { xs: "24px", sm: "32px" },
    paddingTop: "16px",
    paddingBottom: "16px"
  },
  "& .MuiSvgIcon-root": {
    color: "#90A3BF",
  },
};

const styleInput = {
  "& .MuiInputBase-input": {
    fontSize: { xs: "12px", sm: "14px" },
    paddingLeft: "32px",
    paddingRight: "32px",
    paddingTop: "16px",
    paddingBottom: "16px",
  },
  "& .MuiInputBase-root": {
    backgroundColor: "#F6F7F9",
    borderRadius: "10px !important",
    "&::before": {
      borderBottom: "0px !important",
    },
  },
  "& .MuiSvgIcon-root": {
    color: "#90A3BF",
  },
};

interface RentalInfo {
  pickup_location_id: string;
  pickup_date: string;
  dropoff_location_id: string;
  dropoff_date: string;
}

export default function RentalInfo({
  dictionary,
  control,
  errors,
  watch,
  pickup_location_id,
  dropoff_location_id,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  control: any;
  errors: any;
  watch: any;
  pickup_location_id: string;
  dropoff_location_id: string;
}) {
  const today = new Date();

  const elementRef = useRef<HTMLDivElement | null>(null)  

  useEffect(() => {
    if (errors.customer_name || errors.phone_number || errors.address || errors.city) {
      return
    } else if (errors.pickup_location_id || errors.pickup_date || errors.dropoff_location_id || errors.dropoff_date) {
      if (elementRef.current) {
        elementRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [errors])

  return (
    <div ref={elementRef} className="mt-[32px] w-full mx-auto h-fit bg-white rounded-[10px]">
      <div className="xs:p-4 sm:p-6">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="xs:text-[16px] sm:text-[20px] text-[#1A202C] font-bold xs:leading-[24px] sm:leading-[30px] tracking-[-3%]">
              {dictionary.payment.rentalInfo}
            </p>
            <p className="mt-1 xs:text-[12px] sm:text-[14px] text-[#90A3BF] font-medium xs:leading-[15px] sm:leading-[21px] tracking-[-2%]">
              {dictionary.payment.pleaseSelectYourRentalDate}
            </p>
          </div>
          <div className="flex xs:items-start sm:items-end">
            <p className="xs:text-[12px] sm:text-[14px] text-[#90A3BF] font-medium xs:leading-[15px] sm:leading-[21px] tracking-[-2%]">
              {dictionary.payment.step2Of4}
            </p>
          </div>
        </div>

        {/* Pick up */}
        <div className="xs:mt-[24px] sm:mt-[32px]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 flex justify-center items-center bg-[#3563E94D] rounded-[50%]">
              <div className="w-2 h-2 bg-[#3563E9] rounded-[50%]"></div>
            </div>
            <p className="text-[16px] text-[#1A202C] font-semibold leading-[20px]">
              {dictionary.payment.pickUp}
            </p>
          </div>

          <div className="mt-[24px] flex sm:flex-row xs:flex-col gap-8">
            <div className="w-full">
              <p className="mb-[16px] xs:text-[14px] sm:text-[16px] text-[#1A202C] font-semibold xs:leading-[21px] sm:leading-[24px] tracking-[-2%]">
                {dictionary.payment.location}
              </p>
              <Controller
                name="pickup_location_id"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      sx={styleInput}
                      select
                      fullWidth
                      variant="filled"
                      placeholder={dictionary.payment.selectYourCity}
                      value={pickup_location_id ? pickup_location_id : undefined}
                      error={!!errors?.pickup_location_id}
                      helperText={errors.pickup_location_id?.message}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue:
                          pickup_location_id || field.value !== undefined
                            ? undefined
                            : () => (
                                <div className="text-[#90A3BF] text-[12px]">
                                  {dictionary.payment.selectYourCity}
                                </div>
                              ),
                        IconComponent: KeyboardArrowDownIcon,
                      }}
                    >
                      <MenuItem value={"1"}>
                        {dictionary.common.danang}
                      </MenuItem>
                      <MenuItem value={"2"}>
                        {dictionary.common.quangnam}
                      </MenuItem>
                    </TextField>                 
                  );
                }}
              />
            </div>
            <div className="w-full">
              <p className="mb-[16px] xs:text-[14px] sm:text-[16px] text-[#1A202C] font-semibold xs:leading-[21px] sm:leading-[24px] tracking-[-2%]">
                {dictionary.payment.date}
              </p>
              <Controller
                name="pickup_date"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      sx={styleDatePicker}
                      components={["DatePicker"]}
                    >
                      <DatePicker
                        format="DD/MM/YYYY"
                        slots={{
                          openPickerIcon: KeyboardArrowDownIcon,
                        }}
                        minDate={dayjs(today)}
                        maxDate={watch('dropoff_date') ? dayjs(watch('dropoff_date')) : undefined}
                        value={dayjs(watch('pickup_date'))}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        slotProps={{
                          textField: {
                            placeholder: `${dictionary.payment.selectYourDate}`,
                            error: !!errors.pickup_date,
                            helperText: errors.pickup_date?.message,
                            onKeyDown: (e) => e.preventDefault()
                          },
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                )}
              />
            </div>
          </div>
        </div>

        {/* Drop off */}
        <div className="mt-[32px]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 flex justify-center items-center bg-[#5CAFFC4D] rounded-[50%]">
              <div className="w-2 h-2 bg-[#54A6FF] rounded-[50%]"></div>
            </div>
            <p className="text-[16px] text-[#1A202C] font-semibold leading-[20px]">
              {dictionary.payment.dropOff}
            </p>
          </div>

          <div className="mt-[24px] flex sm:flex-row xs:flex-col gap-8">
            <div className="w-full">
              <p className="mb-[16px] xs:text-[14px] sm:text-[16px] text-[#1A202C] font-semibold xs:leading-[21px] sm:leading-[24px] tracking-[-2%]">
                {dictionary.payment.location}
              </p>
              <Controller
                name="dropoff_location_id"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      sx={styleInput}
                      select
                      fullWidth
                      variant="filled"
                      placeholder={dictionary.payment.selectYourCity}
                      value={dropoff_location_id ? dropoff_location_id : undefined}
                      error={!!errors?.dropoff_location_id}
                      helperText={errors.dropoff_location_id?.message}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue:
                          dropoff_location_id || field.value !== undefined
                            ? undefined
                            : () => (
                                <div className="text-[#90A3BF] text-[12px]">
                                  {dictionary.payment.selectYourCity}
                                </div>
                              ),
                        IconComponent: KeyboardArrowDownIcon,
                      }}
                    >
                      <MenuItem value={"1"}>
                        {dictionary.common.danang}
                      </MenuItem>
                      <MenuItem value={"2"}>
                        {dictionary.common.quangnam}
                      </MenuItem>
                    </TextField>
                  );
                }}
              />
            </div>
            <div className="w-full">
              <p className="mb-[16px] xs:text-[14px] sm:text-[16px] text-[#1A202C] font-semibold xs:leading-[21px] sm:leading-[24px] tracking-[-2%]">
                {dictionary.payment.date}
              </p>
              <Controller
                name="dropoff_date"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      sx={styleDatePicker}
                      components={["DatePicker"]}
                    >
                      <DatePicker
                        format="DD/MM/YYYY"
                        slots={{
                          openPickerIcon: KeyboardArrowDownIcon,
                        }}
                        minDate={dayjs(watch('pickup_date'))}
                        value={dayjs(watch('dropoff_date'))}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        slotProps={{
                          textField: {
                            placeholder: `${dictionary.payment.selectYourDate}`,
                            error: !!errors.dropoff_date,
                            helperText: errors.dropoff_date?.message,
                            onKeyDown: (e) => e.preventDefault()
                          },
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
