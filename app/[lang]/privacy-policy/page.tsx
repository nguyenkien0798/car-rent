import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import React from "react";

export const metadata : Metadata = {
  title: 'Privacy Policy',  
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);

  return (
    <div className="m-auto lg:w-[1024px] px-[24px] py-[32px]">
      <div className="text-center">
        <p className="lg:text-[64px] sm:text-[48px] xs:text-[32px] font-semibold">
          {dictionary.privacyPolicy.title}
        </p>
        <p className="mt-[24px]">{dictionary.privacyPolicy.subTitle}</p>
      </div>

      {/* Privacy Policy */}
      <div className="mt-[80px]">
        <p className="mb-[12px] text-[24px] font-semibold">
          {dictionary.privacyPolicy.title}
        </p>
        <p>{dictionary.privacyPolicy.contentPrivacyPolicy}</p>
      </div>

      {/* What We Collect */}
      <div className="mt-[32px]">
        <p className="mb-[12px] text-[24px] font-semibold">
          {dictionary.privacyPolicy.whatWeCollect}
        </p>
        <p>{dictionary.privacyPolicy.contentWhatWeCollect1}</p>
        <p className="mt-[16px]">
          {dictionary.privacyPolicy.contentWhatWeCollect2}
        </p>
        <p className="mt-[16px]">
          {dictionary.privacyPolicy.contentWhatWeCollect3}
        </p>
      </div>

      {/* How We Use The Collected Information */}
      <div className="mt-[32px]">
        <p className="mb-[12px] text-[24px] font-semibold">
          {dictionary.privacyPolicy.howWeUse}
        </p>
        <p>{dictionary.privacyPolicy.contentHowWeUse1}</p>
        <p className="mt-[16px]">{dictionary.privacyPolicy.contentHowWeUse2}</p>
        <p className="mt-[16px]">{dictionary.privacyPolicy.contentHowWeUse3}</p>
      </div>
    </div>
  );
}
