'use client'

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PaypalProvider({ children }: { children: React.ReactNode }) {

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID_PAYPAL ?? "",
    currency: "USD",
    intent: "capture",
};

  return <PayPalScriptProvider options={initialOptions}>{children}</PayPalScriptProvider>
}