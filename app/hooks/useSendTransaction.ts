import { IRootState } from "@/redux/store";
import { connectGlobalWallet } from "@/redux/wallet/walletSlice";
import { connectKeplr } from "@/utils/keplr";
import { connectMetaMask, sendEth } from "@/utils/metamask";
import { connectPetra, sendPetraTransaction } from "@/utils/petra";
import { connectPhantom, sendSol } from "@/utils/phantom";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const useSendTransaction = () => {
  const { address } = useSelector((state: IRootState) => state.wallet);
  const [error, setError] = useState("");
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleSendEth = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError("");
    // console.log("SUBMIT: ", data.get);
    await sendEth({
      setError,
      ether: data.get("amount") as any,
      addr: data.get("addr") as any,
    });
  };

  const handleSendSol = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError("");
    console.log("SUBMIT: ", data.get);
    await sendSol({
      recipient: data.get("addr") as any,
      _amount: parseInt(data.get("amount") as any),
    });
  };

  const handleSendAptos = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError("");
    console.log("SUBMIT: ", data.get("addr"));
    await sendPetraTransaction({
      recipientAddress: data.get("addr") as any,
      amountInAPT: parseInt(data.get("amount") as any),
    });
  };

  return {
    sendSol: handleSendSol,
    sendEth: handleSendEth,
    sendAptos: handleSendAptos,
  };
};
export default useSendTransaction;
