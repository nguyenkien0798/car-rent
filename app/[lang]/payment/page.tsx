import Payment from "@/components/Payment";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import React from "react";

export const metadata : Metadata = {
  title: 'Payment',  
}

export default async function PaymentPage({
  params,
  searchParams: {
    cars_id,
    pickup_location_id,
    pickup_date,
    dropoff_location_id,
    dropoff_date,
  },
}: {
  params: { lang: Locale };
  searchParams: {
    cars_id: string;
    pickup_location_id: string;
    pickup_date: string;
    dropoff_location_id: string;
    dropoff_date: string;
  };
}) {
  const dictionary = await getDictionary(params.lang);

  return (
    <div className="">
      <Payment
        dictionary={dictionary}
        cars_id={cars_id}
        params={params.lang}
        pickup_location_id={pickup_location_id}
        pickup_date={pickup_date}
        dropoff_location_id={dropoff_location_id}
        dropoff_date={dropoff_date}
      />
    </div>
  );
}
