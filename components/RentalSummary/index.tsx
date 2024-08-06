/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import BgImage from "/public/images/bg_rental_car_2.png";
import { Rating, TextField } from "@mui/material";
import { getDictionary } from "@/get-dictionary";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersSummary } from "@/redux/slice/payment";
import { RootState } from "@/redux/store";
import dayjs from "dayjs";
import { getCookie } from "cookies-next";
import Notify from "../Notify";

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
    borderRadius: "10px !important",
    "&::before": {
      borderBottom: "0px !important",
    },
  },
};

export default function RentalSummary({
  dictionary,
  cars_id,
  watch,
  handleChangeCarPrice,
  handleChangeTotalPrice,
  handleChangeSubtotal,
  handleChangeCoupons,
  handleChangeSaleCarPrice,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  cars_id: string;
  watch: any;
  handleChangeCarPrice: (value: number) => void;
  handleChangeSubtotal: (value: number) => void;
  handleChangeTotalPrice: (value: number) => void;
  handleChangeCoupons: (value: string) => void;
  handleChangeSaleCarPrice: (value: number) => void;
}) {
  const dispatch = useDispatch();
  const { ordersSummary, errorRentalSummary } = useSelector(
    (state: RootState) => state.payment
  );
  const [valueCoupons, setValueCoupons] = useState<string>("");
  const [promoCode, setPromoCode] = useState<string>("");

  const today = new Date();

  const accessToken = getCookie("access_token");
  const locale = getCookie("locale");
  const urlAPI = process.env.NEXT_PUBLIC_URL_API;

  useEffect(() => {
    if (errorRentalSummary?.error_id) {
      Notify({ message: errorRentalSummary.message, type: "error" });
    }
  }, [errorRentalSummary]);

  useEffect(() => {
    handleChangeSubtotal(ordersSummary.subtotal);
    handleChangeTotalPrice(ordersSummary.total);
    handleChangeCarPrice(ordersSummary.items[0].price);
    handleChangeSaleCarPrice(ordersSummary.items[0].sale_price);
  }, [ordersSummary]);

  useEffect(() => {
    if (promoCode) {
      handleChangeCoupons(promoCode);
    }
  }, [promoCode])

  useEffect(() => {
    if (accessToken) {
      dispatch(
        getOrdersSummary({
          items: [
            {
              id: cars_id,
              pickup_date: watch("pickup_date")
                ? dayjs(watch("pickup_date")).format("MM/DD/YYYY")
                : dayjs(today).format("MM/DD/YYYY"),
              dropoff_date: watch("dropoff_date")
                ? dayjs(watch("dropoff_date")).format("MM/DD/YYYY")
                : dayjs(today).format("MM/DD/YYYY"),
            },
          ],
        })
      );
    }
  }, [watch("pickup_date"), watch("dropoff_date")]);

  const handleSubmitCoupons = async () => {
    const res = await fetch(`${urlAPI}/v1/orders/preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": `${locale}`,
      },
      body: JSON.stringify({
        items: [
          {
            id: cars_id,
            pickup_date: dayjs(watch("pickup_date")).format("MM/DD/YYYY"),
            dropoff_date: dayjs(watch("dropoff_date")).format("MM/DD/YYYY"),
          },
        ],
        coupon_code: valueCoupons,
      }),
    });

    const dataSummary = await res.json();

    if (dataSummary.message === "Success") {
      setPromoCode(valueCoupons)
      dispatch(
        getOrdersSummary({
          items: [
            {
              id: cars_id,
              pickup_date: dayjs(watch("pickup_date")).format("MM/DD/YYYY"),
              dropoff_date: dayjs(watch("dropoff_date")).format("MM/DD/YYYY"),
            },
          ],
          coupon_code: valueCoupons,
        })
      );
      Notify({ message: dictionary.payment.messageCoupon, type: "success" });
    } else {
      Notify({ message: dataSummary.message, type: "error" });
    }
  };

  return (
    <div className="w-full h-fit bg-white rounded-[10px]">
      <div className="p-6">
        <p className="sm:text-[20px] xs:text-[16px] text-[#1A202C] font-bold xs:leading-[24px] sm:leading-[30px] tracking-[-3%]">
          {dictionary.payment.rentalSummary}
        </p>
        <p className="mt-1 xs:text-[12px] sm:text-[14px] text-[#90A3BF] font-medium xs:leading-[19px] sm:leading-[21px] tracking-[-2%]">
          {dictionary.payment.descriptionRentalSummary}
        </p>

        <div className="mt-[32px] flex items-center gap-4">
          <div
            className="flex items-center justify-center xs:w-[116px] sm:w-[132px] xs:h-[80px] sm:h-[108px] bg-repeat-round rounded-[8px]"
            style={{ backgroundImage: `url(${BgImage.src})` }}
          >
            <img
              className=""
              src={ordersSummary?.items[0]?.thumbnail_url || ""}
              alt=""
            />
          </div>
          <div>
            <p className="xs:text-[20px] sm:text-[32px] text-[#1A202C] font-bold xs:leading-[28px] sm:leading-[48px]">
              {ordersSummary?.items[0]?.name}
            </p>
            <div className="xs:mt-2 sm:mt-0 flex xs:flex-col sm:flex-row items-center gap-1">
              <div className="w-full text-left">
                <Rating
                  sx={{
                    "&.MuiRating-root": {
                      fontSize: { sm: "24px", xs: "18px" },
                    },
                  }}
                  name="read-only"
                  value={ordersSummary?.items[0]?.avg_rating}
                  readOnly
                />
              </div>
              <div className="text-left w-full">
                <p className="xs:text-[12px] sm:text-[14px] text-[#596780] font-medium xs:leading-[15px] sm:leading-[21px]">
                  440+ {dictionary.payment.reviewer}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-8 border-[1px] border-solid broder-[#C3D4E966]"></div>

        <div className="flex justify-between">
          <p className="xs:text-[12px] sm:text-[16px] text-[#90A3BF] font-medium xs:leading-[15px] sm:leading-[24px]">
            {dictionary.payment.subtotal}
          </p>
          <p className="text-[16px] text-[#1A202C] font-semibold leading[24px]">
            ${ordersSummary?.subtotal}
          </p>
        </div>
        <div className="mt-[24px] flex justify-between">
          <p className="xs:text-[12px] sm:text-[16px] text-[#90A3BF] font-medium xs:leading-[15px] sm:leading-[24px]">
            {dictionary.payment.tax}
          </p>
          <p className="text-[16px] text-[#1A202C] font-semibold leading-[24px]">
            ${ordersSummary?.tax}
          </p>
        </div>

        {/* Promo code */}
        <div className="mt-[32px]">
          <TextField
            sx={styleInput}
            value={valueCoupons}
            fullWidth
            type="text"
            variant="filled"
            placeholder={dictionary.payment.applyPromoCode}
            InputProps={{
              endAdornment: (
                <p
                  className="w-[142px] text-center xs:text-[12px] sm:text-[16px] text-[#1A202C] font-semibold xs:leading-[15px] sm:leading-[24px] cursor-pointer"
                  onClick={handleSubmitCoupons}
                >
                  {dictionary.payment.applyNow}
                </p>
              ),
            }}
            onChange={(e) => setValueCoupons(e.target.value)}
          />
        </div>

        <div className="mt-[32px] flex items-center justify-between">
          <div className="xs:max-w-[140px] xm:max-w-[284px]">
            <p className="xs:text-[16px] sm:text-[20px] text-[#1A202C] font-bold xs:leading-[24px] sm:leading-[30px]">
              {dictionary.payment.totalRentalPrice}
            </p>
            <p className="mt-1 xs:text-[12px] sm:text-[14px] text-[#90A3BF] font-medium xs:leading-[15px] sm:leading-[21px]">
              {dictionary.payment.overallPrice}
            </p>
          </div>
          <div>
            <p className="xs:text-[20px] sm:text-[32px] text-[#1A202C] font-bold xs:leading-[30px] sm:leading-[40px]">
              ${ordersSummary?.total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
