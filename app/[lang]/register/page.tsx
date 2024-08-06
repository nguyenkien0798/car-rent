import Register from "@/components/Register";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import React from "react";

export const metadata : Metadata = {
  title: 'Register',  
}

export default async function RegisterPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);

  return (
    <div className="py-[32px]">
      <Register dictionary={dictionary.register} lang={params.lang}/>
    </div>
  );
}
