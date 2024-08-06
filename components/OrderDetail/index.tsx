"use client";

import { getDictionary } from "@/get-dictionary";
import { getOrderDetail } from "@/redux/slice/payment";
import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/navigation";
import NoData from '/public/images/no-data.png'

export default function OrderDetail({
  dictionary,
  order_id,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  order_id: string;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { orderDetail } = useSelector((state: RootState) => state.payment);

  useEffect(() => {
    dispatch(getOrderDetail(order_id));
  }, [order_id]);

  return (
    <div className="max-w-[1312px] mx-auto py-[32px]">
      {orderDetail ? (
        <div className="xs:m-6 1xl:m-0 p-6 bg-white rounded-[15px]">
          {/* Back */}
          <div
            className="w-fit flex items-center cursor-pointer"
            onClick={() => router.back()}
          >
            <ArrowBackIosIcon sx={{ fontSize: "18px" }} />
            <p className="text-[18px]">{dictionary.orders.back}</p>
          </div>

          {/* Title Order */}
          <div className="mb-8 flex justify-center">
            <div className="flex flex-col items-center">
              <p className="xs:text-[24px] md:text-[44px] font-semibold uppercase">
                {dictionary.orders.orderDetail}
              </p>
              <p className="mt-2 xs:text-[16px] md:text-[18px]">
                ID: #{orderDetail?.id}
              </p>
            </div>
          </div>

          {/* Info Order */}
          {orderDetail?.items.map((item, index) => (
            <div
              key={item.id + index}
              className="mt-4 flex lx:flex-row xs:flex-col lx:justify-between"
            >
              <div className="flex xs:justify-between sm:justify-start items-center gap-8">
                <img
                  className="xs:w-[100px] sm:w-[140px] xs:h-[90px] sm:h-[135px] object-contain"
                  src={item.thumbnail}
                  alt=""
                />
                <div className="flex flex-col">
                  <p className="xs:text-[16px] sm:text-[22px] font-bold">
                    {item.name}
                  </p>
                  <p className="xs:text-[14px] sm:text-[16px] font-semibold">
                    ${item.sale_price ? item.sale_price : item.price}
                  </p>
                </div>
              </div>

              {/* Pick-up and Drop-off */}
              <div className="flex xs:flex-col md:flex-row xs:justify-start md:justify-between lx:justify-start md:items-center xs:gap-8 md:gap-20">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex justify-center items-center bg-[#3563E94D] rounded-[50%]">
                      <div className="w-2 h-2 bg-[#3563E9] rounded-[50%]"></div>
                    </div>
                    <p className="xs:text-[16px] sm:text-[18px] font-semibold">
                      {dictionary.orders.pickUp}
                    </p>
                  </div>
                  <div className="flex xs:justify-between sm:justify-start xs:gap-14 sm:gap-16">
                    <div className="mt-4">
                      <p className="xs:text-[16px] sm:text-[18px] font-semibold">
                        {dictionary.orders.location}
                      </p>
                      <p className="mt-2 xs:text-[16px] sm:text-[18px]">
                        {item.pickup_location}
                      </p>
                    </div>
                    <div className="mt-4">
                      <p className="xs:text-[16px] sm:text-[18px] font-semibold">
                        {dictionary.orders.date}
                      </p>
                      <p className="mt-2 xs:text-[16px] sm:text-[18px]">
                        {item.pickup_date}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-[1px] h-full bg-[#00000026]"></div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex justify-center items-center bg-[#5CAFFC4D] rounded-[50%]">
                      <div className="w-2 h-2 bg-[#54A6FF] rounded-[50%]"></div>
                    </div>
                    <p className="xs:text-[16px] sm:text-[18px] font-semibold">
                      {dictionary.orders.dropOff}
                    </p>
                  </div>

                  <div className="flex xs:justify-between sm:justify-start xs:gap-14 sm:gap-16">
                    <div className="mt-4">
                      <p className="xs:text-[16px] sm:text-[18px] font-semibold">
                        {dictionary.orders.location}
                      </p>
                      <p className="mt-2 xs:text-[16px] sm:text-[18px]">
                        {item.dropoff_location}
                      </p>
                    </div>
                    <div className="mt-4">
                      <p className="xs:text-[16px] sm:text-[18px] font-semibold">
                        {dictionary.orders.date}
                      </p>
                      <p className="mt-2 xs:text-[16px] sm:text-[18px]">
                        {item.dropoff_date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="my-8 h-[1px] bg-[#00000026]"></div>

          {/* Billing Info */}
          <div>
            <div className="mt-4 flex justify-between gap-4">
              <p className="xs:text-[14px] sm:text-[18px] font-medium">
                {dictionary.orders.customerName}:
              </p>
              <p className="xs:text-[14px] sm:text-[18px]">
                {orderDetail?.customer_name}
              </p>
            </div>
            <div className="mt-4 flex justify-between gap-4">
              <p className="xs:text-[14px] sm:text-[18px] font-medium">
                {dictionary.orders.phoneNumber}:
              </p>
              <p className="xs:text-[14px] sm:text-[18px]">
                {orderDetail?.phone_number}
              </p>
            </div>
            <div className="mt-4 flex justify-between gap-4">
              <p className="xs:text-[14px] sm:text-[18px] font-medium">
                {dictionary.orders.address}:
              </p>
              <p className="xs:text-[14px] sm:text-[18px]">
                {orderDetail?.address}
              </p>
            </div>
            <div className="mt-4 flex justify-between gap-4">
              <p className="xs:text-[14px] sm:text-[18px] font-medium">
                {dictionary.orders.townCity}:
              </p>
              <p className="xs:text-[14px] sm:text-[18px]">
                {orderDetail?.city}
              </p>
            </div>
          </div>

          <div className="my-8 h-[1px] bg-[#00000026]"></div>

          {/* Price */}
          <div>
            <div className="mt-4 flex justify-between gap-4">
              <p className="xs:text-[14px] sm:text-[18px] font-medium">
                {dictionary.orders.paymentMethod}:
              </p>
              <p className="xs:text-[14px] sm:text-[18px]">
                {orderDetail?.payment_method_name}
              </p>
            </div>
            <div className="mt-4 flex justify-between gap-4">
              <p className="xs:text-[14px] sm:text-[18px] font-medium">
                {dictionary.orders.subtotal}:
              </p>
              <p className="xs:text-[14px] sm:text-[18px]">
                ${orderDetail?.subtotal}
              </p>
            </div>
            <div className="mt-4 flex justify-between gap-4">
              <p className="xs:text-[14px] sm:text-[18px] font-medium">
                {dictionary.orders.tax}:
              </p>
              <p className="xs:text-[14px] sm:text-[18px]">
                ${orderDetail?.tax}
              </p>
            </div>
            <div className="mt-4 flex justify-between gap-4">
              <p className="xs:text-[14px] sm:text-[18px] font-medium">
                {dictionary.orders.coupon}:
              </p>
              <p className="xs:text-[14px] sm:text-[18px]">
                ${orderDetail?.coupon_discount}
              </p>
            </div>
            <div className="mt-4 flex justify-between gap-4">
              <p className="xs:text-[18px] sm:text-[20px] font-bold">
                {dictionary.orders.totalPrice}:
              </p>
              <p className="xs:text-[18px] sm:text-[20px] font-bold">
                ${orderDetail?.total}
              </p>
            </div>
          </div>

          <div className="mt-10 mb-4 flex justify-center">
            <button className="w-[140px] text-white font-bold bg-[#3563E9] px-[20px] py-[10px] rounded-[5px] hover:bg-[#54A6FF] uppercase">
              {dictionary.orders.download}
            </button>
          </div>
        </div>  
      ) : (
        <div className="my-[64px] max-w-[375px] mx-auto">
          <div className="flex justify-center">
            <img src={NoData.src} alt="no-data" />
          </div>
          <p className="mt-8 text-center text-[18px] font-semibold">{dictionary.common.noData}</p>
        </div>
      )}
    </div>
  );
}
