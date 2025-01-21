import { IRootState } from "@/redux/store";
import {
  addToHistory,
  HistoryType,
} from "@/redux/transactions/transactionSlice";
import { sendEth } from "@/utils/wallets/metamask";
import { sendPetraTransaction } from "@/utils/wallets/petra";
import { sendSol } from "@/utils/wallets/phantom";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useSendTransaction = () => {
  const { address } = useSelector((state: IRootState) => state.wallet);
  const [error, setError] = useState("");
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleAddToHistory = (data: HistoryType) => {
    dispatch(addToHistory({ ...data }));
  };
  const handleSendEth = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError("");
    // console.log("SUBMIT: ", data.get);
    const response = await sendEth({
      setError,
      ether: data.get("amount") as any,
      addr: data.get("addr") as any,
    });
    if (response) {
      handleAddToHistory({
        id: "",
        senderAddress: address ?? "",
        recipientAddress: data.get("addr") as string,
        amount: parseFloat(data.get("amount") as any),
        currency: "ETH",
        dateTime: new Date().toISOString(),
        status: "success",
      });
    } else {
      handleAddToHistory({
        id: "",
        senderAddress: address ?? "",
        recipientAddress: data.get("addr") as string,
        amount: parseFloat(data.get("amount") as any),
        currency: "ETH",
        dateTime: new Date().toISOString(),
        status: "failed",
      });
    }
  };

  const handleSendSol = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError("");
    const response = await sendSol({
      recipient: data.get("addr") as any,
      _amount: parseFloat(data.get("amount") as any),
    });

    if (response) {
      handleAddToHistory({
        id: "",
        senderAddress: address ?? "",
        recipientAddress: data.get("addr") as string,
        amount: parseFloat(data.get("amount") as any),
        currency: "SOL",
        dateTime: new Date().toISOString(),
        status: "success",
      });
    } else {
      handleAddToHistory({
        id: "",
        senderAddress: address ?? "",
        recipientAddress: data.get("addr") as string,
        amount: parseFloat(data.get("amount") as any),
        currency: "SOL",
        dateTime: new Date().toISOString(),
        status: "failed",
      });
    }
  };

  const handleSendAptos = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError("");
    console.log("SUBMIT: ", data.get("addr"));
    const response = await sendPetraTransaction({
      recipientAddress: data.get("addr") as any,
      amountInAPT: parseFloat(data.get("amount") as any),
    });
    if (response) {
      handleAddToHistory({
        id: "",
        senderAddress: address ?? "",
        recipientAddress: data.get("addr") as string,
        amount: parseFloat(data.get("amount") as any),
        currency: "APTOS",
        dateTime: new Date().toISOString(),
        status: "success",
      });
    } else {
      handleAddToHistory({
        id: "",
        senderAddress: address ?? "",
        recipientAddress: data.get("addr") as string,
        amount: parseFloat(data.get("amount") as any),
        currency: "APTOS",
        dateTime: new Date().toISOString(),
        status: "failed",
      });
    }
  };

  return {
    sendSol: handleSendSol,
    sendEth: handleSendEth,
    sendAptos: handleSendAptos,
  };
};
export default useSendTransaction;
