"use client";

import React from 'react';
import { getDictionary } from "@/get-dictionary";
import RegisterForm from "../RegisterForm";
import { Register } from "@/types/auth";
import Notify from "../Notify";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n-config";

export default function Register({
  dictionary,
  lang
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["register"];
  lang: Locale
}) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<string>("")
  const urlAPI = process.env.NEXT_PUBLIC_URL_API;

  const handleSubmitForm = async (register: Register) => {
    const res = await fetch(`${urlAPI}/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": `${lang === 'en' ? 'en-US' : 'vi'}`,
      },
      body: JSON.stringify(
        register
      )
    })

    
    const data = !res.ok ? await res.json() : undefined

    if (res.ok) {
      Notify({ message: dictionary.signInSuccessfully, type: "success" });
      router.push("/login");
    } 
    if (data?.error_id) {
      // Notify({ message: data.message, type: "error" });
      setErrorMessage(data.message)
    }
  };

  const handleChangeErrorMessage = () => {
    setErrorMessage("")
  }

  return (
    <div className="xs:w-[350px] xm:w-[410px] sm:w-[600px] lg:w-[650px] m-auto py-[32px] bg-white rounded-[20px] shadow-cardCar">
      <p className="pb-[64px] text-[42px] text-center font-semibold">
        {dictionary.registerTitle}
      </p>
      <RegisterForm
        dictionary={dictionary}
        handleSubmitForm={handleSubmitForm}
        handleChangeErrorMessage={handleChangeErrorMessage}
        errorMessage={errorMessage}
      />
    </div>
  );
}
