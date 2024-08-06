"use client";

import { Rating } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getDictionary } from "@/get-dictionary";
import { useEffect, useState } from "react";
import { CarReview, ListCarReview } from "@/types/product";
import { Locale } from "@/i18n-config";

export default function CarReviews({
  dictionary,
  params,
  car_id,
  listCarReview
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["common"];
  params: Locale;
  car_id: string;
  listCarReview: ListCarReview
}) {
  const [listDataCarReview, setListDataCarReview] = useState<CarReview[]>([]);
  const [totalCarReview, setTotalCarReview] = useState<number>(0);
  const [page, setPage] = useState<number>(1)

  const urlAPI = process.env.NEXT_PUBLIC_URL_API;

  useEffect(() => {
    if (listCarReview) {
      setListDataCarReview(listCarReview.items)
      setTotalCarReview(listCarReview.total_review)
    }
  }, [])

  useEffect(() => {
    if (page > 1) {
      fetchData()
    }
  }, [page])

  const getData = async () => {
    const responseCarReview = await fetch(`${urlAPI}/v1/reviews?car_id=${car_id}&limit=4&offset=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": `${params}`,
        }
      }    
    )
  const listCarReview = await responseCarReview.json()

  return listCarReview.data
  }

  const fetchData = async () => {
    const res = await getData();
    if (res) {
      setListDataCarReview([...listDataCarReview, ...res.items]);
    }
  };

  const handleShowMore = () => {
    setPage(page + 1)
  }

  return (
    <div className="pb-[32px] xs:px-[16px] sm:px-[24px] 1xl:px-0">
      <div className="p-[24px] bg-[#FFFFFF] rounded-[10px]">
        <div className="flex items-center gap-[12px]">
          <p className="text-[20px] text-[#1A202C] font-semibold leading-[25px]">
            {dictionary.reviews}
          </p>
          <p className="text-[14px] text-white font-bold bg-[#3563E9] leading-[17.64px] rounded-[4px] px-[20px] py-[6px]">
            {totalCarReview}
          </p>
        </div>

        {/* Reviewers */}
        <div className="mt-[32px] mb-[24px]">
          {listDataCarReview?.map((review, index) => (
            <div key={review.user_id + index}>
            <div className="flex justify-between items-center">
              <div className="flex xs:gap-2 sm:gap-4">
                <img
                  src={review.avatar_url}
                  alt="avatar"
                  className="xs:w-[44px] sm:w-[56px] xs:h-[44px] sm:h-[56px] rounded-[50%]"
                />
                <div>
                  <p className="mb-[8px] xs:text-[16px] sm:text-[20px] text-[#1A202C] font-bold xs:leading-[24px] sm:leading-[30px]">
                    {review.user_name}
                  </p>
                  <p className="xs:text-[12px] sm:text-[14px] text-[#90A3BF] font-medium xs:leading-[15px] sm:leading-[21px]">
                    {review.user_job}
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="pt-[8px] text-right xs:text-[12px] sm:text-[14px] text-[#90A3BF] font-medium xs:leading-[15px] sm:leading-[21px]">
                  {review.created_at}
                </p>
                <Rating
                  name="read-only"
                  value={review.rating}
                  readOnly
                  sx={{
                    "&.MuiRating-root": {
                      paddingTop: "4px",
                      fontSize: { sm: "24px", xs: "18px" },
                    },
                  }}
                />
              </div>
            </div>
            <div className="xs:ml-[52px] sm:ml-[72px] mt-[16px]">
              <p className="text-[14px] text-[#596780] font-normal leading-[28px]">
                {review.content}
              </p>
            </div>
          </div>
          ))}
        </div>

        {/* Button Show All */}
        {listDataCarReview?.length >= totalCarReview ? "" : (
          <div onClick={handleShowMore} className="flex justify-center">
            <div className="flex gap-2 cursor-pointer">
              <p className="text-[16px] text-[#90A3BF] font-semibold leading-[24px]">
                {dictionary.showAll}
              </p>
              <KeyboardArrowDownIcon className="text-[#90A3BF]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
