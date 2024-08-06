"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Locale, i18n } from "@/i18n-config";
import Image from "next/image";
import Vi from "/public/images/vi.jpg";
import En from "/public/images/en.png";
import { Popover } from "@mui/material";
import { setCookie } from "cookies-next";

const SwitchLanguage = ({ lang }: { lang: Locale }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [localeLocal, setLocaleLocal] = React.useState<string>(lang);

  // React.useEffect(() => {
  //   setCookie("locale", localeLocal);
  // }, [localeLocal]);

  const redirectedPathName = (locale: Locale) => {
    setCookie("locale", localeLocal);
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;

    if (searchParams) {
      return router.push(
        segments.join("/") + `?${searchParams.toString()}`
      );
    }
    router.push(segments.join("/"))
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="">
      <Image
        className={`cursor-pointer`}
        src={lang === "vi" ? Vi : En}
        alt="language"
        width={36}
        height={36}
        onClick={handlePopoverOpen}
      />
      <Popover
        className="mt-2"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
      >
        <div className="px-[12px] pt-[8px]">
          {i18n.locales.map((language: Locale, index: number) => (
            <div key={index} className={`pb-[8px] cursor-pointer`}>
              <Image
                className={`p-[2px] ${lang === language ? "border-[1px] border-solid border-[#841644]" : ""}`}
                src={language === "vi" ? Vi : En}
                alt="language"
                width={36}
                height={36}
                onClick={() => {
                  redirectedPathName(language);
                  setLocaleLocal(language);
                }}
              />
            </div>
          ))}
        </div>
      </Popover>
    </div>
  );
};

export default SwitchLanguage;
