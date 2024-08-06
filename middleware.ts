import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      ),
    );
  } 

  const [, locale, ...segments] = request.nextUrl.pathname.split("/");

  if (segments.join("/") === "login" || segments.join("/") === "register" || segments.join("/") === "verify-email") {
    const accessToken = request.cookies.get("access_token")?.value;
    if (accessToken) {

      return NextResponse.redirect(new URL(`/`, request.url));
    }
  }

  if (segments.join("/") === "payment" || segments.join("/") === "orders" || (segments[0] === "orders" && segments.length > 1)) {
    const accessToken = request.cookies.get("access_token")?.value;

    if (!accessToken) {
      const requestUrl = new URL(request.url);
      const callbackPath = requestUrl.pathname + requestUrl.search;

      return NextResponse.redirect(new URL(`/${locale}/login?callbackUrl=${callbackPath}`, request.url));
    }
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
