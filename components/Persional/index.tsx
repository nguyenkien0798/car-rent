"use client";

import React from "react";

import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "../Avatar";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import SwitchLanguage from "../SwitchLanguage";
import Link from "next/link";
import { User } from "@/types/auth";

const Persional = ({
  dictionary,
  lang,
  user,
}: {
  lang: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["header"];
  user?: User;
}) => {
  return (
    <div>
      {user ? (
        <div className="flex justify-end items-center gap-4">
          <div className="ml:flex justify-end xs:hidden gap-4">
            <IconButton
              sx={{ 
                color: '#596780',
                width: '44px', 
                height: '44px',
                border: '1px solid #C3D4E9'
              }}
              aria-label="favorite"
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton
              sx={{ 
                color: '#596780',
                width: '44px', 
                height: '44px',
                border: '1px solid #C3D4E9'
              }}
              aria-label="favorite"
            >
              <NotificationsIcon />
            </IconButton>
            <IconButton
              sx={{ 
                color: '#596780',
                width: '44px', 
                height: '44px',
                border: '1px solid #C3D4E9'
              }}
              aria-label="favorite"
            >
              <SettingsIcon />
            </IconButton>
          </div>
          <div>
            <SwitchLanguage lang={lang} />
          </div>
          <div>
            <Avatar user={user} dictionary={dictionary} lang={lang}/>
          </div>
        </div>
      ) : (
        <div className="flex justify-end items-center gap-3">
          <div>
            <SwitchLanguage lang={lang} />
          </div>
          <button className="px-[20px] py-[10px] text-[#FFFFFF] font-semibold bg-[#3563E9] rounded-[10px] hover:bg-[#54A6FF]">
            <Link href={`/${lang}/login`}>{dictionary.signIn}</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Persional;
