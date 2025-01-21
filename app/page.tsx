"use client";
import { useState } from "react";
import { AvailableWallets } from "./hooks/useWallet";
import ChooseWalletModal from "./components/ChooseWalletModal";
import SendTransactionForm from "./components/SendTransactionForm";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import useSendTransaction from "./hooks/useSendTransaction";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Hero from "./components/landing/hero";

export default function Home() {
  const { walletType, address } = useSelector(
    (state: IRootState) => state.wallet
  );
  const { sendSol, sendEth, sendAptos } = useSendTransaction();
  const [isChooseModalOpen, setIsChooseModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [txs, setTxs] = useState<any>("");
  const handleCloseModal = () => setIsChooseModalOpen(false);

  const handleSend = async (e: any) => {
    if (walletType === AvailableWallets.METAMASK) {
      await sendEth(e);
    } else if (walletType === AvailableWallets.PETRA) {
      await sendAptos(e);
    } else if (walletType === AvailableWallets.PHANTOM) {
      await sendSol(e);
    } else {
      setIsChooseModalOpen(true);
    }
  };
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between md:p-24 p-10">
      <ChooseWalletModal
        isOpen={isChooseModalOpen}
        onClose={handleCloseModal}
      />

      {!address ? (
        <Hero />
      ) : (
        <SendTransactionForm
          currency={
            walletType === AvailableWallets.METAMASK
              ? "ETH"
              : walletType === AvailableWallets.PETRA
              ? "APTOS"
              : "SOL"
          }
          error={error}
          txs={txs}
          handleSubmit={handleSend}
        />
      )}
    </main>
  );
}
