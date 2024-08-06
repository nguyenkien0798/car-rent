"use client";

import React, { useEffect } from 'react'
import { getDictionary } from "@/get-dictionary";
import LoginForm from "../LoginForm";
import { Login } from "@/types/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/redux/slice/auth";
import Notify from "../Notify";
import { getCookie, setCookie } from "cookies-next";
import { Locale } from "@/i18n-config";

export default function Login({
  dictionary,
  callbackUrl,
  lang
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["login"];
  callbackUrl: string;
  lang: Locale
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = React.useState<string>("")

  const accessToken = getCookie('access_token')
  const urlAPI = process.env.NEXT_PUBLIC_URL_API;

  useEffect(() => {
    if (accessToken) {
      router.back()
    }
  }, [])

  const handleLoginForm = async (login: Login) => {
    const res = await fetch(`${urlAPI}/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": `${lang === 'en' ? 'en-US' : 'vi'}`,
      },
      body: JSON.stringify(login)
    })

    const data = await res.json()

    if (data.message === 'Success') {
      setCookie('access_token', data.data.access_token)
      setCookie('refresh_token', data.data.refresh_token)
      Notify({ message: dictionary.signInSuccessfully, type: "success" });
      dispatch(getCurrentUser());
      if (callbackUrl) {
        router.push(`${callbackUrl}`, { scroll: true })
      } else {
        router.push(`/${lang}/`);
      }
    } else {
      // Notify({ message: data.message, type: "error" });
      setErrorMessage(data.message)
    }
  };

  const handleChangeErrorMessage = () => {
    setErrorMessage("")
  } 

  return (
    <div className="xs:w-[350px] xm:w-[410px] sm:w-[600px] lg:w-[650px] m-auto py-[32px] bg-white rounded-[20px] shadow-cardCar">
      <p className="pb-[40px] text-[42px] text-center font-semibold">
        {dictionary.loginTitle}
      </p>
      <LoginForm
        dictionary={dictionary}
        handleLoginForm={handleLoginForm}
        errorMessage={errorMessage}
        handleChangeErrorMessage={handleChangeErrorMessage}
      />
    </div>
  );
}
