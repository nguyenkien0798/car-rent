import VerifyEmail from "@/components/VerifyEmail";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata : Metadata = {
  title: 'Verify Email',  
}

export default async function VerifyEmailPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);

  return (
    <Suspense>
      <div className="lg:w-[1024px] px-[16px] m-auto py-[64px]">
        <VerifyEmail dictionary={dictionary.verifyEmail} lang={params.lang}/>
      </div>
    </Suspense>
  );
}
