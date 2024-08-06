import React from "react";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import { getDictionary } from "@/get-dictionary";
import PaypalImage from "/public/images/PayPal.png";
import CODImage from "/public/images/cod.png";
import Image from "next/image";

const styleRadioButton = {
  "& .MuiRadio-label": {
    fontSize: { xs: "14px", sm: "16px" },
  },
  "& .MuiRadio-icon": {
    color: "#3563E9 !important",
  },
  "&.MuiRadio-root": {
    display: "flex",
    alignItems: "center",
  },
  "& .MuiRadio-radio": {
    width: "16px",
    height: "16px",
    backgroundColor: "#FFFFFF !important",
    border: "1px solid #90A3BF",
  },
};

export default function PaymentMethod({
  dictionary,
  paymentMethod,
  handleChangePaymentMethod,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  paymentMethod: number
  handleChangePaymentMethod: (value: number) => void;
}) {
  return (
    <div className="mt-[32px] w-full h-fit bg-white rounded-[10px]">
      <div className="xs:p-4 sm:p-6">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="xs:text-[16px] sm:text-[20px] text-[#1A202C] font-bold xs:leading-[24px] sm:leading-[30px] tracking-[-3%]">
              {dictionary.payment.paymentMethod}
            </p>
            <p className="mt-1 xs:text-[12px] sm:text-[14px] text-[#90A3BF] font-medium xs:leading-[15px] sm:leading-[21px] tracking-[-2%]">
              {dictionary.payment.pleaseEnterYourPaymentMethod}
            </p>
          </div>
          <div className="flex xs:items-start sm:items-end">
            <p className="xs:text-[12px] sm:text-[14px] text-[#90A3BF] font-medium xs:leading-[15px] sm:leading-[21px] tracking-[-2%]">
              {dictionary.payment.step3Of4}
            </p>
          </div>
        </div>

        <div className="mt-[32px]">
          <RadioGroup defaultValue={paymentMethod} onChange={(e) => handleChangePaymentMethod(+e.target.value)}>
            <div className="px-[32px] py-[16px] flex items-center justify-between bg-[#F6F7F9] rounded-[10px]">
              <Radio
                checkedIcon={
                  <div className="w-4 h-4 flex justify-center items-center bg-[#5CAFFC4D] rounded-[50%]">
                    <div className="w-2 h-2 bg-[#3563E9] rounded-[50%]"></div>
                  </div>
                }
                sx={styleRadioButton}
                value={1}
                label="Paypal"
                variant="soft"
              />
              <Image
                src={PaypalImage}
                alt=""
                className="xs:w-[96px] sm:w-[100px] sm:h-[24px] xs:h-[20px]"
              />
            </div>
            <div className="mt-[24px] px-[32px] flex items-center justify-between bg-[#F6F7F9] rounded-[10px]">
              <div className=" py-[16px]">
                <Radio
                  checkedIcon={
                    <div className="w-4 h-4 flex justify-center items-center bg-[#5CAFFC4D] rounded-[50%]">
                      <div className="w-2 h-2 bg-[#3563E9] rounded-[50%]"></div>
                    </div>
                  }
                  sx={styleRadioButton}
                  value={2}
                  label={dictionary.payment.cod}
                  variant="soft"
                />
              </div>
              <Image src={CODImage} alt="" className="w-[56px] h-[52px]" />
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
