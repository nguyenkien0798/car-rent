"use client";

import { redirect, usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  redirect(`${pathname.split("/")[0]}/not-found`);
}