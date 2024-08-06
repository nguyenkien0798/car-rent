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
import Favicon from "/public/images/icon_car.png";
import ScropToTop from '@/components/ScrollToTop'

const inter = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Morent",
  description: "",
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
