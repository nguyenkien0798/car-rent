"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import EmailSuccess from "/public/images/email-success.png";
import EmailFailed from "/public/images/email-failed.png";
import { getDictionary } from "@/get-dictionary";
import { useRouter, useSearchParams } from "next/navigation";
import { Locale } from "@/i18n-config";

export default function VerifyEmail({
  dictionary,
  lang
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["verifyEmail"];
  lang: Locale
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isVerifyEmail, setIsVerifyEmail] = React.useState<string>("");
  const urlAPI = process.env.NEXT_PUBLIC_URL_API;

  useEffect(() => {
    if (token) {
      verifyToken()
    }
  }, [token]);

  const verifyToken = async () => {
    setIsLoading(true)
    const res = await fetch(`${urlAPI}/v1/auth/verify/email?token=${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": `${lang === 'en' ? 'en-US' : 'vi'}`,
      },
    })

    const data = await res.json()

    if (data === "errors.jwt expired") {
      setIsVerifyEmail('error')
      setIsLoading(false)
    } else {
      setIsVerifyEmail('success')
      setIsLoading(false)
    }
  }

  const handleRedirectSignIn = () => {
    router.push("/login");
  };

  const rederContent = () => {
    switch (isVerifyEmail) {
      case "success":
        return (
          <div className="max-w-[600px] mx-auto bg-[#FFFFFF]">
            <div className="py-[32px] flex flex-col items-center rounded-[10px] shadow-cardCar">
              <Image src={EmailSuccess} width={200} height={200} alt="email" />
              <p className="mt-[24px] text-center text-[32px] font-bold">
                {dictionary.titleVerifyEmailSuccess}
              </p>
              <p className="mt-[16px] text-center font-medum">
                {dictionary.contentVerifyEmailSuccess}
              </p>
              <button
                className="mt-[24px] px-[24px] py-[12px] bg-[#3563E9] text-[#FFFFFF] text-[18px] font-semibold normal-case"
                onClick={handleRedirectSignIn}
              >
                {dictionary.goToSignIn}
              </button>
            </div>
          </div>
        );
      case "error":
        return (
          <div className="max-w-[600px] mx-auto bg-[#FFFFFF]">
            <div className="py-[32px] flex flex-col items-center rounded-[10px] shadow-cardCar">
              <Image src={EmailFailed} width={200} height={200} alt="email" />
              <p className="mt-[24px] text-center text-[32px] font-bold">
                {dictionary.titleVerifyEmailFail}
              </p>
              <p className="mt-[16px] text-center font-medum">
                {dictionary.contentVerifyEmailFail}
              </p>
              <button
                className="mt-[24px] px-[24px] py-[12px] bg-[#3563E9] text-[#FFFFFF] text-[18px] font-semibold normal-case"
                onClick={handleRedirectSignIn}
              >
                {dictionary.goToSignIn}
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="animate-spin w-[100px] h-[100px] mx-auto my-[100px] border-x-2 border-[#13131399] rounded-[50%]" />
      ) : (
        rederContent()
      )}
    </div>
  );
}
