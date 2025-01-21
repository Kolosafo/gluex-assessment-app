"use client";
import { IRootState } from "@/redux/store";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import SearchInput from "./searchInput";
import { HistoryType } from "@/redux/transactions/transactionSlice";

function Search({
  setIsLoading,
  setNotFound,
  setSearchQuery,
  searchQuery,
  setDisplayHistory,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setNotFound: Dispatch<SetStateAction<boolean>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setDisplayHistory: Dispatch<React.SetStateAction<HistoryType[]>>;
  searchQuery: string;
}) {
  const { history } = useSelector((state: IRootState) => state.transactions);

  useEffect(() => {
    setNotFound(false);
    const filterHistory = history.filter((h) =>
      h.recipientAddress.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (!filterHistory) {
      setNotFound(true);
      return;
    }
    setDisplayHistory(filterHistory);
  }, [searchQuery, history, setDisplayHistory, setNotFound]);
  return (
    <div className="flex md:w-1/2 w-full">
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder={"Search reciever address"}
        handleSubmitSearch={() => {}}
      />
    </div>
  );
}

export default Search;
