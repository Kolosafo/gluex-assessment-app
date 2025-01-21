import { HistoryType } from "@/redux/transactions/transactionSlice";
import { checkIsTodayOrYesterday, truncateString } from "@/utils/helpers";
import React from "react";

function HistoryCard(data: HistoryType) {
  return (
    <div className="relative flex flex-col rounded-lg bg-purple-300/40 p-4">
      <span className="mb-4 text-2xl font-semibold">
        {checkIsTodayOrYesterday(data.dateTime).toString()}
      </span>
      <div className="flex md:flex-row flex-col md:items-center gap-6">
        <span className="text-sm">
          To:{" "}
          <span className="font-semibold md:text-lg text-xs">
            {truncateString(data.recipientAddress)}
          </span>
        </span>
        <span className="text-sm">
          Token:{" "}
          <span className="font-semibold ml-1">
            {data.amount} {data.currency}
          </span>
        </span>
        <span
          className={`text-sm ${
            data.status !== "success" ? "text-red-400" : "text-green-400"
          }`}
        >
          Status: <span className="font-semibold">{data.status}</span>
        </span>
      </div>
    </div>
  );
}

export default HistoryCard;
