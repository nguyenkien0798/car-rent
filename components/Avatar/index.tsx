"use client";

import React from "react";
import Image from "next/image";
import DefaultAvatar from "/public/images/avatar-default.png";
import { Popover, Typography } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { User } from "@/types/auth";
import { getDictionary } from "@/get-dictionary";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slice/auth";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n-config";

const Avatar = ({
  user,
  dictionary,
  lang,
}: {
  user?: User;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["header"];
  lang: Locale;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleLogoutUser = () => {
    dispatch(logout());
    router.push(`/${lang}/`)
  };

  const redirectOrdersPage = () => {
    router.push(`/${lang}/orders`);
  };

  return (
    <div className="cursor-pointer">
      <Image
        className="w-[44px] h-[44px] rounded-[50%]"
        src={DefaultAvatar}
        alt="Avatar"
        onClick={handlePopoverOpen}
      />

      <Popover
        id="mouse-over-popover"
        sx={{ mt: 2 }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div className="py-[16px]">
          <p className="flex items-center px-[16px] pb-[12px] cursor-pointer">
            <AccountCircleIcon />
            <Typography className="px-[16px]">{user?.full_name}</Typography>
          </p>
          <p
            onClick={() => {
              redirectOrdersPage();
              handlePopoverClose();
            }}
            className="flex items-center px-[16px] pb-[12px] cursor-pointer"
          >
            <ListAltIcon />
            <Typography className="px-[16px]">{dictionary.myOrder}</Typography>
          </p>
          <p
            className="flex items-center px-[16px] cursor-pointer"
            onClick={() => {
              handleLogoutUser();
              handlePopoverClose();
            }}
          >
            <LogoutIcon />
            <Typography className="px-[16px]">{dictionary.logOut}</Typography>
          </p>
        </div>
      </Popover>
    </div>
  );
};

export default Avatar;
