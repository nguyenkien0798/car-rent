/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { getDictionary } from "@/get-dictionary";
import { Checkbox } from "@mui/material";
import SecuritySafety from "/public/images/security_safety.png";
import Image from "next/image";
import { PayPalButtons } from "@paypal/react-paypal-js";
import RefreshIcon from '@mui/icons-material/Refresh';

export default function PaymentConfirm({
  dictionary,
  paymentMethod,
  trigger,
  onApprove,
  createOrder,
  onCancel,
  isLoadingButtonSubmit,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  paymentMethod: number;
  trigger: () => void;
  onApprove: (data: any) => Promise<void>;
  createOrder: (data: any) => Promise<string>;
  onCancel: (data: any) => Promise<void>;
  isLoadingButtonSubmit: boolean;
}) {
  const [checkoboxAgreeTerms, setCheckboxAgreeTerms] = useState<boolean>(false);

  return (
    <div className="mt-[32px] w-full h-fit bg-white rounded-[10px]">
      <div className="xs:p-4 sm:p-6">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="xs:text-[16px] sm:text-[20px] text-[#1A202C] font-bold xs:leading-[24px] sm:leading-[30px] tracking-[-3%]">
              {dictionary.payment.confirmation}
            </p>
            <p className="mt-1 xs:text-[12px] sm:text-[14px] text-[#90A3BF] font-medium xs:leading-[15px] sm:leading-[21px] tracking-[-2%]">
              {dictionary.payment.weAreGettingToTheEnd}
            </p>
          </div>
          <div className="flex xs:items-start sm:items-end justify-end w-[100px]">
            <p className="xs:text-[12px] sm:text-[14px] text-[#90A3BF] font-medium xs:leading-[15px] sm:leading-[21px] tracking-[-2%]">
              {dictionary.payment.step4Of4}
            </p>
          </div>
        </div>

        <div className="mt-[32px] px-[32px] py-[16px] flex items-center gap-[20px] bg-[#F6F7F9] rounded-[10px]">
          <Checkbox
            sx={{ "&.MuiButtonBase-root": { width: {xs: '16px', md: '24px'}, height: {xs: '16px', md: '24px'}, p: 0 } }}
          />
          <p className="xs:text-[12px] sm:text-[16px] xs:leading-[19px] sm:leading-[21px] xs:font-medium sm:font-semibol text-[#1F2544]">
            {dictionary.payment.iAgreeWithSending}
          </p>
        </div>

        <div className="mt-[32px] px-[32px] py-[16px] flex items-center gap-[20px] bg-[#F6F7F9] rounded-[10px]">
          <Checkbox
            sx={{ "&.MuiButtonBase-root": { width: {xs: '16px', md: '24px'}, height: {xs: '16px', md: '24px'} ,p: 0 } }}
            onChange={(e, val) => setCheckboxAgreeTerms(val)}
          />
          <p className="xs:text-[12px] sm:text-[16px] xs:leading-[19px] sm:leading-[21px] xs:font-medium sm:font-semibol text-[#1F2544]">
            {dictionary.payment.iAgreeWithOurTerms}
          </p>
        </div>

        <div className="relative">
          <div className="mt-[32px]">
              <button
                type="submit"
                disabled={!checkoboxAgreeTerms}
                className={`${!checkoboxAgreeTerms && 'bg-[#cccccc]'} xs:px-[16px] sm:px-[32px] xs:py-[10px] sm:py-[16px] bg-[#3563E9] xs:text-[12px] sm:text-[16px] text-[#FFFFFF] font-bold xs:leading-[15px] sm:leading-[20px] xs:rounded-[4px] sm:rounded-[10px]`}
              >
                {isLoadingButtonSubmit ? (
                  <RefreshIcon className="animate-spin h-4" />
                ) : dictionary.payment.rentNow}
              </button>
            </div>
          
            {paymentMethod === 1 && (
              <div className="absolute top-0 w-[150px] opacity-0">
                <PayPalButtons
                  disabled={!checkoboxAgreeTerms}
                  style={{
                    layout: "horizontal",
                    tagline: false,
                    height: 50,
                  }}
                  createOrder={(data) => createOrder(data)}
                  onApprove={(data) => onApprove(data)}
                  onCancel={(data) => onCancel(data)}
                  onClick={async (data, actions) => {
                    const result: any = await trigger();
                    if (!result) {
                      return actions.reject();
                    } else {
                      return actions.resolve();
                    }
                  }}
                />
              </div>
            )}
        </div>
        

        <div className="mt-[32px]">
          <Image src={SecuritySafety} width={32} height={32} alt="" />
          <div className="mt-[16px]">
            <p className="text-[16px] text-[#1A202C] font-semibold leading-[24px]">
              {dictionary.payment.allYourDateAreSafe}
            </p>
            <p className="mt-2 xs:text-[12px] sm:text-[14px] text-[#90A3BF] font-medium xs:leading-[15px] sm:leading-[21px]">
              {dictionary.payment.weAreUsingTheMost}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
