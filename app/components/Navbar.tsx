"use client";
import Image from "next/image";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import useWallet from "../hooks/useWallet";
import ChooseWalletModal from "./ChooseWalletModal";

const Navbar = () => {
  const [isChooseModalOpen, setIsChooseModalOpen] = useState(false);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connectWallet } = useWallet();
  const { address, walletType } = useSelector(
    (state: IRootState) => state.wallet
  );

  const handleCloseModal = () => setIsChooseModalOpen(false);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between my-[35px] px-10 gap-6">
      <div className="lg:flex-1 flex flex-row py-2 pl-4 pr-2 ">
        <div className="w-[72px] h-full rounded-md bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <span>Home</span>
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address ? "Send Tokens" : `Connect ${walletType ?? ""} Wallet`}
          styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (address) {
              // OPEN TOKEN SENDING MODAL
            } else if (walletType) {
              connectWallet(walletType);
            } else {
              setIsChooseModalOpen(true);
            }
          }}
          onDropdownClick={() => setIsChooseModalOpen(true)}
        />
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <Image
            width={100}
            height={100}
            src={"/logo.svg"}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <Image
          width={100}
          height={100}
          src={"/menu.svg"}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            <li
              className={`flex p-4`}
              onClick={() => {
                setToggleDrawer(false);
              }}
            >
              <p
                className={`ml-[20px] font-epilogue font-semibold text-[14px] text-[#1dc071]`}
              >
                Home
              </p>
            </li>
          </ul>

          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? "Create a campaign" : "Connect"}
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                if (address) {
                  // OPEN TOKEN SENDING MODAL
                } else if (walletType) {
                  connectWallet(walletType);
                } else {
                  setIsChooseModalOpen(true);
                }
              }}
              onDropdownClick={() => setIsChooseModalOpen(true)}
            />
          </div>
        </div>
      </div>
      <ChooseWalletModal
        isOpen={isChooseModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Navbar;
