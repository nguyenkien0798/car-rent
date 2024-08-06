import OrderDetail from '@/components/OrderDetail';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config'
import { Metadata } from 'next';
import React from 'react'

export const metadata : Metadata = {
  title: 'Order Detail',  
}

export default async function OrderDetailPage({ params }: { params: { lang: Locale, order_id: string } }) {
  const dictionary = await getDictionary(params.lang)

  return (
    <div>
      <OrderDetail dictionary={dictionary} order_id={params.order_id}/>
    </div>
  )
}