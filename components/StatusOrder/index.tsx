import { getDictionary } from "@/get-dictionary";
import React from "react";

export default function StatusOrder({
  status,
  dictionary,
}: {
  status: string;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const renderStatus = () => {
    switch (status) {
      case "open":
        return (
          <div className="w-[150px] py-2 px-4 rounded-[10px] bg-[#ccc]">
            <p className="text-white font-bold">{dictionary.common.statusOpen}</p>
          </div>
        );
      case "pending":
        return (
          <div className="w-[150px] py-2 px-4 rounded-[10px] bg-[#FFD700]">
            <p className="text-white font-bold">{dictionary.common.statusPending}</p>
          </div>
        );
      case "paid":
        return (
          <div className="w-[150px] py-2 px-4 rounded-[10px] bg-[#32CD32]">
            <p className="text-white font-bold">{dictionary.common.statusPaid}</p>
          </div>
        );
      case "cancelled":
        return (
          <div className="w-[150px] py-2 px-4 rounded-[10px] bg-[#DC143C]">
            <p className="text-white font-bold">{dictionary.common.statusCancel}</p>
          </div>
        );
    }
  };

  return (
    <div className="flex justify-center">
      {renderStatus()}
    </div>
  );
}
