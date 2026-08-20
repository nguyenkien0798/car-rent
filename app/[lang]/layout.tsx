import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { i18n, type Locale } from "../../i18n-config";
import { ReduxProvider } from "@/redux/provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaypalProvider from "@/components/PaypalProvider";
import Favicon from "../../public/images/icon_car.png";
import ScropToTop from "@/components/ScrollToTop";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://morent.com",
  ),
  title: {
    default: "Morent | Premium Car Rental",
    template: "%s | Morent",
  },
  description:
    "Morent is a modern car rental platform in Vietnam, offering daily and long-term vehicle rental with easy booking and trusted service.",
  keywords: [
    "car rental Vietnam",
    "rent car",
    "daily car rental",
    "Morent",
    "vehicle rental",
    "car booking",
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      vi: "/vi",
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Morent",
    title: "Morent | Premium Car Rental",
    description:
      "Book the right car for your trip with Morent. Flexible rental packages, trusted vehicles, and fast booking in Vietnam.",
    images: [
      {
        url: "/images/icon_car.png",
        width: 1200,
        height: 630,
        alt: "Morent car rental",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morent | Premium Car Rental",
    description: "Book a reliable car rental in Vietnam with Morent.",
    images: ["/images/icon_car.png"],
  },
  icons: {
    icon: `${Favicon.src}`,
  },
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const dictionary = await getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <PaypalProvider>
          <ReduxProvider>
            <Header dictionary={dictionary} lang={params.lang} />
            <div className="bg-[#F6F7F9]">{children}</div>
            <ScropToTop />
            <Footer dictionary={dictionary.footer} />
            <ToastContainer />
          </ReduxProvider>
        </PaypalProvider>
      </body>
    </html>
  );
}
