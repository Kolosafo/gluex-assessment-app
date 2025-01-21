"use client";

import React, { useState } from "react";
import MaxWidthContainer from "../components/max-width-container";
import Search from "../components/search";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import HistoryCard from "../components/historyCard";

const Page = () => {
  const { history } = useSelector((state: IRootState) => state.transactions);
  const [displayHistory, setDisplayHistory] = useState(history);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [fetchLoading, setFetchLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  return (
    <MaxWidthContainer className="space-y-8 py-10">
      <section className="flex flex-col gap-2 lg:gap-4 items-center w-full">
        <span className="mb-4 max-w-prose font-bold text-xl">
          Search by Reciever Address
        </span>
        <Search
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          setIsLoading={setFetchLoading}
          setNotFound={setNotFound}
          setDisplayHistory={setDisplayHistory}
        />
      </section>
      {!notFound ? (
        <div className="mx-auto max-w-md rounded-md border bg-white p-4">
          <h1 className="text-center lg:text-lg text-purple-600">
            Transaction History
          </h1>
        </div>
      ) : (
        <div className="mx-auto max-w-md rounded-md border bg-white p-4">
          <h1 className="text-center lg:text-lg text-red-600">
            NO TRANSACTION HISTORY FOR THAT ADDRESS
          </h1>
        </div>
      )}

      <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
        {displayHistory.map((item, index) => (
          <HistoryCard key={index} {...item} />
        ))}
      </div>
    </MaxWidthContainer>
  );
};

export default Page;
