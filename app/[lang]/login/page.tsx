import Login from "@/components/Login";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import React from "react";

export const metadata : Metadata = {
  title: 'Login',  
}

export default async function LoginPage({
  params,
  searchParams: { callbackUrl }
}: {
  params: { lang: Locale };
  searchParams: { callbackUrl: string }
}) {
  const dictionary = await getDictionary(params.lang);

  return (
    <div className='py-[32px]'>
      <Login dictionary={dictionary.login} callbackUrl={callbackUrl} lang={params.lang}/>
    </div>
  );
}
