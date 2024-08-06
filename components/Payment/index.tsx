/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { getDictionary } from "@/get-dictionary";
import React, { useEffect, useState } from "react";
import BillingInfo from "../BillingInfo";
import RentalSummary from "../RentalSummary";
import RentalInfo from "../RentalInfo";
import PaymentMethod from "../PaymentMethod";
import PaymentConfirm from "../PaymentConfirm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { getCookie } from "cookies-next";
import Notify from "../Notify";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n-config";
import dayjs from "dayjs";
import {
  destroySDKScript,
  getScriptID,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { post } from "@/services/axios";
import { PaymentInfo } from "@/types/payment";
import {
  CreateOrderData,
  OnApproveData,
} from "@paypal/paypal-js/types/components/buttons";

export default function Payment({
  dictionary,
  cars_id,
  params,
  pickup_location_id,
  pickup_date,
  dropoff_location_id,
  dropoff_date
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  cars_id: string;
  params: Locale;
  pickup_location_id: string;
  pickup_date: string;
  dropoff_location_id: string;
  dropoff_date: string;
}) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<number>(2);
  const [carPrice, setCarPrice] = useState<number>(0);
  const [saleCarPrice, setSaleCarPrice] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [coupons, setCoupons] = useState<string>("");
  const [isLoadingButtonSubmit, setIsLoadingButtonSubmit] = useState<boolean>(false)

  const urlApi = process.env.NEXT_PUBLIC_URL_API;
  const accessToken = getCookie("access_token");
  const locale = getCookie("locale");

  useEffect(() => {
    if (!accessToken) {
      router.back()
    }
  }, [])

  const handleChangeSaleCarPrice = (price: number) => {
    setSaleCarPrice(price);
  };

  const handleChangeCoupons = (coupons: string) => {
    setCoupons(coupons);
  };

  const handleChangeSubtotal = (total: number) => {
    setSubTotal(total);
  };

  const handleChangeTotalPrice = (price: number) => {
    setTotalPrice(price);
  };

  const handleChangePaymentMethod = (method: number) => {
    setPaymentMethod(method);
  };

  const handleChangeCarPrice = (value: number) => {
    setCarPrice(value);
  };

  const paymentInfoSchema = Yup.object()
    .shape({
      customer_name: Yup.string().required(
        dictionary.payment.thisFieldIsRequired
      ),
      phone_number: Yup.string()
        .required(dictionary.payment.thisFieldIsRequired),
      address: Yup.string().required(dictionary.payment.thisFieldIsRequired),
      city: Yup.string().required(dictionary.payment.thisFieldIsRequired),
      pickup_location_id: Yup.string().required(
        dictionary.payment.thisFieldIsRequired
      ),
      pickup_date: Yup.string().required(
        dictionary.payment.thisFieldIsRequired
      ),
      dropoff_location_id: Yup.string().required(
        dictionary.payment.thisFieldIsRequired
      ),
      dropoff_date: Yup.string().required(
        dictionary.payment.thisFieldIsRequired
      ),
    })
    .required();

  const {
    formState: { errors },
    handleSubmit,
    control,
    watch,
    trigger,
    setValue
  } = useForm<PaymentInfo>({
    defaultValues: {
      customer_name: "",
      phone_number: "",
      address: "",
      city: "",
    },
    resolver: yupResolver(paymentInfoSchema),
    mode: "all",
  });

  const todayNow = new Date()

  useEffect(() => {
    if (pickup_location_id) {
      setValue('pickup_location_id', pickup_location_id)
    }
    if (pickup_date) {
      setValue('pickup_date', pickup_date)
    } else {
      setValue('pickup_date', dayjs(todayNow).toString())
    }
    if (dropoff_location_id) {
      setValue('dropoff_location_id', dropoff_location_id)
    }
    if (dropoff_date) {
      setValue('dropoff_date', dropoff_date)
    } else {
      setValue('dropoff_date', dayjs(todayNow).toString())
    }
  }, [pickup_location_id, pickup_date, dropoff_location_id, dropoff_date])

  const clientIdPaypal = {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID_PAYPAL ?? "",
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ isResolved }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    destroySDKScript(getScriptID(clientIdPaypal));
    dispatch({
      type: "setLoadingStatus",
      // @ts-ignore
      value: "initial",
    });
  }, [
    watch,
    carPrice,
    subTotal,
    totalPrice,
    paymentMethod,
    saleCarPrice,
    coupons,
  ]);

  const onSubmit = async (data: PaymentInfo) => {
    setIsLoadingButtonSubmit(true)
    const response = await post(`/v1/orders`, 
    {
      customer_name: data.customer_name,
      phone_number: data.phone_number,
      address: data.address,
      city: data.city,
      coupon_code: coupons ? coupons : "",
      // subtotal: subTotal,
      // total: totalPrice,
      payment_method_id: paymentMethod,
      items: [
        {
          id: cars_id,
          price: carPrice,
          sale_price: saleCarPrice,
          pickup_location_id: data.pickup_location_id,
          pickup_date: dayjs(data.pickup_date).format('MM/DD/YYYY'),
          dropoff_location_id: data.dropoff_location_id,
          dropoff_date: dayjs(data.dropoff_date).format('MM/DD/YYYY'),
        },
      ],
    }
    );

    if (response.data.error_id) {
      setIsLoadingButtonSubmit(false)
      Notify({ message: response.data.message, type: "error" });
    }

    if (response.data.message === "Success") {
      setIsLoadingButtonSubmit(false)
      Notify({
        message: `${dictionary.payment.ordersSuccessfully}`,
        type: "success",
      });
      router.push(`/${params}/orders`, { scroll: true });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const createOrder = async (data: CreateOrderData) => {
    setIsLoadingButtonSubmit(true)
    const customer_name = watch("customer_name");
    const phone_number = watch("phone_number");
    const address = watch("address");
    const city = watch("city");
    const pickup_location_id = watch("pickup_location_id");
    const pickup_date = dayjs(watch("pickup_date")).format("MM/DD/YYYY");
    const dropoff_location_id = watch("dropoff_location_id");
    const dropoff_date = dayjs(watch("dropoff_date")).format("MM/DD/YYYY");

    // Order is created on the server and the order id is returned
    // eslint-disable-next-line no-useless-catch
    try {
      return await post(`/v1/orders`, 
        {
          customer_name: customer_name,
          phone_number: phone_number,
          address: address,
          city: city,        
          coupon_code: coupons ? coupons : "",
          // subtotal: subTotal,
          // total: totalPrice,
          payment_method_id: paymentMethod,
          items: [
            {
              id: cars_id,
              price: carPrice,
              sale_price: saleCarPrice,
              pickup_location_id: pickup_location_id,
              pickup_date: pickup_date,
              dropoff_location_id: dropoff_location_id,
              dropoff_date: dropoff_date,
            },
          ],
        }
        )
          .then((response) => response.data)
          .then((order) => {
            if (order.message === "Success") {
              setIsLoadingButtonSubmit(false)
              return order.data.payment_order_id;
            }
            if (order.error_id) {
              setIsLoadingButtonSubmit(false)
              Notify({ message: order.message, type: "error" });
            }
          });
    } catch (error: any) {
      Notify({ message: error.response.data.message, type: "error" });
      setIsLoadingButtonSubmit(false)
      throw error;
    }
  };

  const onApprove = (data: OnApproveData) => {
    // eslint-disable-next-line no-useless-catch
    try {
      // Order is captured on the server
    return fetch(`${urlApi}/v1/orders/payments/${data.orderID}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": `${locale}`,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    })
      .then((response) => response.json())
      .then((orderData) => {
        if (orderData.message === "Success") {
          Notify({
            message: `${dictionary.payment.paymentSuccesfully}`,
            type: "success",
          });
          router.push(`/${params}/orders`, { scroll: true });
        } else {
          Notify({
            message: `${dictionary.payment.ordersFailed}`,
            type: "error",
          });
        }
      });
    } catch (error: any) {
      Notify({ message: error.response.data.message, type: "error" });
      throw error;
    }
  };

  const onCancel = (data: Record<string, unknown>) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return fetch(`${urlApi}/v1/orders/payments/${data.orderID}/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": `${locale}`,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      }).then((response) => response.json());
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto py-8 xs:px-6 sm:px-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex mh:flex-row xs:flex-col gap-8">
          <div className="xs:order-2 mh:order-1 mh:max-w-[852px] 2xl:w-[852px] xs:w-full h-fit">
            <BillingInfo
              dictionary={dictionary}
              control={control}
              errors={errors}
            />

            <RentalInfo
              dictionary={dictionary}
              control={control}
              errors={errors}
              watch={watch}
              pickup_location_id={pickup_location_id}
              dropoff_location_id={dropoff_location_id}
            />

            <PaymentMethod
              dictionary={dictionary}
              paymentMethod={paymentMethod}
              handleChangePaymentMethod={handleChangePaymentMethod}
            />

            <PaymentConfirm
              dictionary={dictionary}
              paymentMethod={paymentMethod}
              trigger={() => trigger()}
              createOrder={createOrder}
              onApprove={onApprove}
              onCancel={onCancel}
              isLoadingButtonSubmit={isLoadingButtonSubmit}
            />
          </div>

          <div className="xs:order-1 mh:order-2 mh:max-w-[492px] w-full xs:w-full h-fit bg-white rounded-[10px]">
            <RentalSummary
              dictionary={dictionary}
              cars_id={cars_id}
              watch={watch}
              handleChangeCarPrice={handleChangeCarPrice}
              handleChangeSubtotal={handleChangeSubtotal}
              handleChangeTotalPrice={handleChangeTotalPrice}
              handleChangeCoupons={handleChangeCoupons}
              handleChangeSaleCarPrice={handleChangeSaleCarPrice}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
