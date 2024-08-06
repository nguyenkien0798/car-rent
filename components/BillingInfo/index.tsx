/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getDictionary } from "@/get-dictionary";
import { TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Controller } from "react-hook-form";

const styleInput = {
  "& .MuiInputBase-input": {
    fontSize: { xs: "12px", sm: "14px" },
    paddingLeft: "32px",
    paddingRight: "32px",
    paddingTop: "16px",
    paddingBottom: "16px",
    "&::placeholder": {
      color: '#90A3BF',
      opacity: 1,
      fontSize: '14px',
      lineHeight: '21px',
      fontWeight: '500'
    }
  },
  "& .MuiInputBase-root": {
    backgroundColor: "#F6F7F9",
    borderRadius: "10px !important",
    "&::before": {
      borderBottom: "0px !important",
    },
  },
  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "input[type=number]": {
    MozAppearance: "textfield",
  },
};

interface BillingInfo {
  customer_name: string;
  phone_number: string;
  address: string;
  city: string;
}

export default function BillingInfo({
  dictionary,
  control,
  errors
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  control: any
  errors: any
}) {

  const elementRef = useRef<HTMLDivElement | null>(null)  

  useEffect(() => {
    if (errors.customer_name || errors.phone_number || errors.address || errors.city) {
      if (elementRef.current) {
        elementRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [errors])

return (
    <div ref={elementRef} className="w-full h-fit bg-white rounded-[10px]">
      <div className="xs:p-4 sm:p-6">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="xs:text-[16px] sm:text-[20px] text-[#1A202C] font-bold xs:leading-[24px] sm:leading-[30px] tracking-[-3%]">
              {dictionary.payment.billingInfo}
            </p>
            <p className="mt-1 xs:text-[12px] sm:text-[14px] text-[#90A3BF] font-medium xs:leading-[15px] sm:leading-[21px] tracking-[-2%]">
              {dictionary.payment.pleaseEnterYourBillingInfo}
            </p>
          </div>
          <div className="flex xs:items-start sm:items-end">
            <p className="xs:text-[12px] sm:text-[14px] text-[#90A3BF] font-medium xs:leading-[15px] sm:leading-[21px] tracking-[-2%]">
              {dictionary.payment.step1Of4}
            </p>
          </div>
        </div>

        <div className="xs:mt-[24px] sm:mt-[32px] flex sm:flex-row xs:flex-col gap-8">
          <div className="w-full">
            <p className="mb-[16px] xs:text-[14px] sm:text-[16px] text-[#1A202C] font-semibold xs:leading-[21px] sm:leading-[24px] tracking-[-2%]">
              {dictionary.payment.name}
            </p>
            <Controller
              name="customer_name"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    sx={styleInput}
                    fullWidth
                    type="text"
                    variant="filled"
                    placeholder={dictionary.payment.name}
                    error={!!errors?.customer_name}
                    helperText={errors.customer_name?.message}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    onBlur={(e) => {
                      field.onChange(
                        e.target.value
                          .replace(/^\s+|\s+$/g, "")
                          .replace(/\s+/g, " ")
                      );
                    }}
                  />
                );
              }}
            />
          </div>
          <div className="w-full">
            <p className="mb-[16px] xs:text-[14px] sm:text-[16px] text-[#1A202C] font-semibold xs:leading-[21px] sm:leading-[24px] tracking-[-2%]">
              {dictionary.payment.phoneNumber}
            </p>
            <Controller
              name="phone_number"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}  
                    sx={styleInput}
                    fullWidth
                    type="number"
                    variant="filled"
                    placeholder={dictionary.payment.phoneNumber}
                    error={!!errors?.phone_number}
                    helperText={errors.phone_number?.message}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                );
              }}
            />
          </div>
        </div>
        <div className="mt-[24px] flex sm:flex-row xs:flex-col gap-8">
          <div className="w-full">
            <p className="mb-[16px] xs:text-[14px] sm:text-[16px] text-[#1A202C] font-semibold xs:leading-[21px] sm:leading-[24px] tracking-[-2%]">
              {dictionary.payment.address}
            </p>
            <Controller
              name="address"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    sx={styleInput}
                    fullWidth
                    type="text"
                    variant="filled"
                    placeholder={dictionary.payment.address}
                    error={!!errors?.address}
                    helperText={errors.address?.message}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    onBlur={(e) => {
                      field.onChange(
                        e.target.value
                          .replace(/^\s+|\s+$/g, "")
                          .replace(/\s+/g, " ")
                      );
                    }}
                  />
                );
              }}
            />
          </div>
          <div className="w-full">
            <p className="mb-[16px] xs:text-[14px] sm:text-[16px] text-[#1A202C] font-semibold xs:leading-[21px] sm:leading-[24px] tracking-[-2%]">
              {dictionary.payment.townCity}
            </p>
            <Controller
              name="city"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    sx={styleInput}
                    fullWidth
                    type="text"
                    variant="filled"
                    placeholder={dictionary.payment.townOrCity}
                    error={!!errors?.city}
                    helperText={errors.city?.message}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    onBlur={(e) => {
                      field.onChange(
                        e.target.value
                          .replace(/^\s+|\s+$/g, "")
                          .replace(/\s+/g, " ")
                      );
                    }}
                  />
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
