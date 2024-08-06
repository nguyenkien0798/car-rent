import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import React from "react";

export const metadata : Metadata = {
  title: 'Terms Of Service',  
}

export default async function TermsOfServicePage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);

  return (
    <div className="lg:w-[1024px] m-auto px-[24px] py-[32px]">
      <div className='text-center'>
        <p className="lg:text-[64px] sm:text-[48px] xs:text-[32px] font-semibold">
          {dictionary.termsOfService.title}
        </p>
      </div>

      {/* Acceptance of Terms */}
      <div className="mt-[42px]">
        <p className="mb-[12px] text-[24px] font-semibold">
          1. {dictionary.termsOfService.acceptanceOfTerms}
        </p>
        <p>{dictionary.termsOfService.contentAcceptance}</p>
      </div>

      {/* Rental Agreement */}
      <div className="mt-[42px]">
        <p className="mb-[12px] text-[24px] font-semibold">
          2. {dictionary.termsOfService.rentalAgreement}
        </p>
        <p>{dictionary.termsOfService.contentRentalAgreement1}</p>
        <p className="mt-[16px]">
          {dictionary.termsOfService.contentRentalAgreement2}
        </p>
        <p className="mt-[16px]">
          {dictionary.termsOfService.contentRentalAgreement3}
        </p>
      </div>

      {/* Rental Rates and Fees */}
      <div className="mt-[42px]">
        <p className="mb-[12px] text-[24px] font-semibold">
          3. {dictionary.termsOfService.rentalRatesAndFees}
        </p>
        <p>{dictionary.termsOfService.contentRentalRates1}</p>
        <p className="mt-[16px]">
          {dictionary.termsOfService.contentRentalRates2}
        </p>
      </div>

      {/* Payment and Security Deposit */}
      <div className="mt-[42px]">
        <p className="mb-[12px] text-[24px] font-semibold">
          4. {dictionary.termsOfService.paymentAndSecurity}
        </p>
        <p>{dictionary.termsOfService.contentPaymentAndSecurity1}</p>
        <p className="mt-[16px]">
          {dictionary.termsOfService.contentPaymentAndSecurity2}
        </p>
      </div>

      {/* Cancellation and Refund Policy */}
      <div className="mt-[42px]">
        <p className="mb-[12px] text-[24px] font-semibold">
          5. {dictionary.termsOfService.cancellationAndRefundPolicy}
        </p>
        <p>{dictionary.termsOfService.contentCancellation1}</p>
        <p className="mt-[16px]">
          {dictionary.termsOfService.contentCancellation2}
        </p>
      </div>

      {/* Insurance and Liability */}
      <div className="mt-[42px]">
        <p className="mb-[12px] text-[24px] font-semibold">
          6. {dictionary.termsOfService.insuranceAndLiability}
        </p>
        <p>{dictionary.termsOfService.contentInsurance1}</p>
        <p className="mt-[16px]">
          {dictionary.termsOfService.contentInsurance2}
        </p>
      </div>

      {/* Termination of Agreement */}
      <div className="mt-[42px]">
        <p className="mb-[12px] text-[24px] font-semibold">
          7. {dictionary.termsOfService.terminationOfAgreement}
        </p>
        <p>{dictionary.termsOfService.contentTermination}</p>
      </div>

      {/* Governing Law */}
      <div className="mt-[42px]">
        <p className="mb-[12px] text-[24px] font-semibold">
          8. {dictionary.termsOfService.governingLaw}
        </p>
        <p>{dictionary.termsOfService.contentGoverning}</p>
      </div>

      {/* Changes to Terms */}
      <div className="mt-[42px]">
        <p className="mb-[12px] text-[24px] font-semibold">
          9. {dictionary.termsOfService.changesToTerms}
        </p>
        <p>{dictionary.termsOfService.contentChangesToTerms}</p>
      </div>

      <div className="mt-[42px]">
        <p className="mb-[12px] text-[24px] font-semibold">
          {dictionary.termsOfService.contactInfo}
        </p>
        <p>{dictionary.termsOfService.companyName}: Morent</p>
        <p>
          {dictionary.termsOfService.address}: 31 Nguyễn Hữu An, Sơn Trà, Đà
          Nẵng
        </p>
        <p>{dictionary.termsOfService.phoneNumber}: 0777258147</p>
      </div>

      <div className="mt-[42px] flex">
        <p className="text-[24px] font-semibold">
          {dictionary.termsOfService.effectiveDate}:
        </p>
        <p className="ml-[8px] text-[24px]">22/01/2024</p>
      </div>
    </div>
  );
}
