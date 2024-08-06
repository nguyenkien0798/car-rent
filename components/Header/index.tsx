"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Logo from "/public/images/Logo.png";
import SearchBar from "../SearchBar";
import Persional from "../Persional";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "@/redux/slice/auth";
import { RootState } from "@/redux/store";

import { getCookie, setCookie } from 'cookies-next';
import { FilterTag } from "@/types/product";
import { usePathname, useRouter } from "next/navigation";

function Header({
  dictionary,
  lang,
}: {
  lang: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const router = useRouter();
  const pathName = usePathname()
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [listFilterTag, setListFilterTag] = useState<FilterTag>()
  
  const accessToken = getCookie("access_token");
  const urlAPI = process.env.NEXT_PUBLIC_URL_API;

  useEffect(() => {
    setCookie("locale", lang);
  }, []);

  useEffect(() => {
    if (accessToken) {
      dispatch(getCurrentUser());
    }
  }, [accessToken]);

  useEffect(() => {
    getFilter()
  }, [pathName])

  const getFilter = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const res = await fetch(`${urlAPI}/v1/car-tags`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": `${lang === 'en' ? 'en-US' : 'vi'}`,
          }
        }    
      )
      const listFilter = await res.json()
      setListFilterTag(listFilter.data)

      return listFilter.data
    } catch (error) {
      throw error;
    }
  }

  return (
    <Suspense>
      <div className="flex justify-between items-center 2xl:w-[1425px] xs:py-[24px] sm:py-[42px] xs:px-[24px] 2xl:pl-[60px] 2xl:pr-[60px] mx-auto">
        <div onClick={() => router.push(`/${lang}/`)} className="cursor-pointer">
          <Image src={Logo} alt="logo" className="xs:w-[130px] xm:w-[148px]" />
        </div>

        {/* Search Bar */}
        {pathName !== `/${lang}/payment` && (
          <div className="sm:block hd:hidden">
            <SearchBar dictionary={dictionary} filter={listFilterTag} params={lang}/>
          </div>
        )}
        
        {/* List Icons Persional */}
        <Persional dictionary={dictionary.header} lang={lang} user={user} />
      </div>

      {pathName !== `/${lang}/payment` && (
        <div className="sm:hidden xs:flex justify-center mb-4">
          <SearchBar dictionary={dictionary} filter={listFilterTag} params={lang}/>
        </div>
      )}
    </Suspense>
  );
}

export default Header;
