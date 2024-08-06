import React from "react";
import Image from "next/image";
import { getDictionary } from "../../get-dictionary";
import Logo from "/public/images/Logo.png";
import Link from "next/link";

function Footer({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["footer"];
}) {
  return (
    <div className="2xl:max-w-[1440px] m-auto">
      {/* Content top */}
      <div className="flex justify-between xs:flex-col lg:flex-row gap-12  py-[42px] xs:px-[24px] 2xl:px-0 2xl:mx-[64px] sm:border-b-[1px] sm:border-solid sm:border-[#13131329]">
        <div className="xl:w-[30%] sm:w-[40%] xs:w-[80%] ">
          <Image src={Logo} alt="logo" width={148} height={44} />
          <p className="mt-[16px] text-[16px] font-medium leading-6 text-[#13131399]">
            {dictionary["ourVision"]}
          </p>
        </div>

        <div className="lg:w-[50%] xs:[80%] grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xs:grid-cols-2 gap-[60px]">
          <div>
            <p className="text-[#1A202C] text-[20px] leading-[30px]">
              {dictionary["about"]}
            </p>
            <p className="mt-[16px] text-[16px] font-medium leading-6 text-[#13131399]">
              {dictionary["howItWorks"]}
            </p>
            <p className="mt-[12px] text-[16px] font-medium leading-6 text-[#13131399]">
              {dictionary["featured"]}
            </p>
            <p className="mt-[12px] text-[16px] font-medium leading-6 text-[#13131399]">
              {dictionary["partnership"]}
            </p>
            <p className="mt-[12px] text-[16px] font-medium leading-6 text-[#13131399]">
              {dictionary["bussinessRelation"]}
            </p>
          </div>

          <div>
            <p className="text-[#1A202C] text-[20px] leading-[30px]">
              {dictionary["community"]}
            </p>
            <p className="mt-[16px] text-[16px] font-medium leading-6 text-[#13131399]">
              {dictionary["event"]}
            </p>
            <p className="mt-[12px] text-[16px] font-medium leading-6 text-[#13131399]">
              {dictionary["blog"]}
            </p>
            <p className="mt-[12px] text-[16px] font-medium leading-6 text-[#13131399]">
              {dictionary["podcast"]}
            </p>
            <p className="mt-[12px] text-[16px] font-medium leading-6 text-[#13131399]">
              {dictionary["inviteAFriend"]}
            </p>
          </div>

          <div>
            <p className="text-[#1A202C] text-[20px] leading-[30px]">
              {dictionary["socials"]}
            </p>
            <p className="mt-[16px] text-[16px] font-medium leading-6 text-[#13131399]">
              Discord
            </p>
            <p className="mt-[12px] text-[16px] font-medium leading-6 text-[#13131399]">
              Instagram
            </p>
            <p className="mt-[12px] text-[16px] font-medium leading-6 text-[#13131399]">
              Twitter
            </p>
            <p className="mt-[12px] text-[16px] font-medium leading-6 text-[#13131399]">
              Facebook
            </p>
          </div>
        </div>
      </div>
      {/* Content bottom */}
      <div className="flex justify-between ml:flex-row xs:flex-col gap-8 py-[24px] xs:px-[24px] 2xl:px-[64px] m-auto">
        <div>
          <p className="ml:text-[16px] xs:text-[12px] font-semibold leading-6 text-[#1A202C]">
            {dictionary["copyright"]}
          </p>
        </div>

        <div className="flex xs:justify-between ml:justify-start gap-12">
          <Link
            href="/privacy-policy"
            className="ml:text-[16px] xs:text-[12px] font-semibold leading-6 text-[#1A202C]"
          >
            {dictionary["privacyPolicy"]}
          </Link>
          <Link
            href="/terms-of-service"
            className="ml:text-[16px] xs:text-[12px] font-semibold leading-6 text-[#1A202C]"
          >
            {dictionary["termsCondition"]}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
