import Orders from '@/components/Orders'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import { Metadata } from 'next'
import React from 'react'

export const metadata : Metadata = {
  title: 'Order List',  
}

export default async function OrdersPage({ params }: { params: {lang: Locale} }) {
  const dictionary = await getDictionary(params.lang)

  return (
    <div>
      <Orders dictionary={dictionary} params={params.lang}/>
    </div>
  )
}