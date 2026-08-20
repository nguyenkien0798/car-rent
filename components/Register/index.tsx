"use client";

import React from "react";
import { getDictionary } from "@/get-dictionary";
import RegisterForm from "../RegisterForm";
import { Register } from "@/types/auth";
import Notify from "../Notify";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n-config";
import { customFetch } from "@/services/http";

export default function Register({
  dictionary,
  lang,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["register"];
  lang: Locale;
}) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const handleSubmitForm = async (register: Register) => {
    try {
      await customFetch("/v1/auth/register", {
        method: "POST",
        lang,
        body: register,
      });
      Notify({ message: dictionary.signInSuccessfully, type: "success" });
      router.push("/login");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    }
  };

  const handleChangeErrorMessage = () => {
    setErrorMessage("");
  };

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
