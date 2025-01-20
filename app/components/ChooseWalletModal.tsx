"use client";
import { IRootState } from "@/redux/store";
import React from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import WalletSelectCard from "./WalletSelectCard";
import { WalletsList } from "@/constants/walletsList";
import useWallet from "../hooks/useWallet";

const ChooseWalletModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { connectWallet } = useWallet();

  //   const { user, isLogged } = useSelector((state: IRootState) => state.user);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-purple-300 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <div className="p-4 flex justify-end">
          <button onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>
        <div className="p-6 text-center">
          <div className="flex justify-center items-center">
            <h2 className="text-xl font-bold mb-8 w-[60%]">
              <span className="text-purple-500">Select Wallet</span>
            </h2>
          </div>
          <div className="space-y-4 flex items-center justify-center flex-col">
            {WalletsList.map((wallet, index) => (
              <WalletSelectCard
                key={index}
                {...wallet}
                onClick={(type) => {
                  connectWallet(type);
                  onClose();
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseWalletModal;
