"use client";
import Image from "next/image";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import useWallet from "../hooks/useWallet";
import ChooseWalletModal from "./ChooseWalletModal";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isChooseModalOpen, setIsChooseModalOpen] = useState(false);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connectWallet } = useWallet();
  const { address, walletType } = useSelector(
    (state: IRootState) => state.wallet
  );
  const router = useRouter();

  const handleCloseModal = () => setIsChooseModalOpen(false);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between my-[35px] px-10 gap-6">
      <div className="lg:flex-1 flex flex-row py-2 pl-4 pr-2 ">
        <div
          onClick={() => {
            router.push("/");
          }}
          className="w-[72px] h-full rounded-md bg-[#4acd8d] md:flex hidden justify-center items-center cursor-pointer"
        >
          <span>Home</span>
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          address={address ?? undefined}
          btnType="button"
          title={address ? "History" : `Connect ${walletType ?? ""} Wallet`}
          styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (address) {
              router.push("/history");
            } else if (walletType) {
              connectWallet(walletType);
            } else {
              setIsChooseModalOpen(true);
            }
          }}
          onDropdownClick={() => setIsChooseModalOpen(true)}
        />
        {address && (
          <CustomButton
            address={address ?? undefined}
            btnType="button"
            title={`Change Wallet`}
            styles={"bg-[#8c6dfd]"}
            handleClick={() => {
              setIsChooseModalOpen(true);
            }}
            onDropdownClick={() => setIsChooseModalOpen(true)}
          />
        )}
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div
          onClick={() => {
            router.push("/");
          }}
          className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer"
        >
          <Image
            width={100}
            height={100}
            src={"/glueXLogo.jpg"}
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
                router.push("/");
                setToggleDrawer(false);
              }}
            >
              <p
                className={`ml-[20px] font-epilogue font-semibold text-[14px] text-[#1dc071]`}
              >
                Home
              </p>
            </li>
            {address && (
              <>
                <li
                  className={`flex p-4`}
                  onClick={() => {
                    setIsChooseModalOpen(true);
                  }}
                >
                  <p
                    className={`ml-[20px] font-epilogue font-semibold text-[14px] text-[#4acd8d]`}
                  >
                    Change Wallet
                  </p>
                </li>
                <li
                  className={`flex p-4`}
                  onClick={() => {
                    router.push("/history");
                  }}
                >
                  <p
                    className={`ml-[20px] font-epilogue font-semibold text-[14px] text-[#4acd8d]`}
                  >
                    History
                  </p>
                </li>
              </>
            )}
          </ul>
          {!address && (
            <div className="flex mx-4">
              <CustomButton
                btnType="button"
                address={address ?? undefined}
                title={"Connect Wallet"}
                styles={address ? "bg-[#1dc071] w-full" : "bg-[#8c6dfd] w-full"}
                handleClick={() => {
                  if (walletType) {
                    connectWallet(walletType);
                  } else {
                    setIsChooseModalOpen(true);
                  }
                }}
                onDropdownClick={() => setIsChooseModalOpen(true)}
              />
            </div>
          )}
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
