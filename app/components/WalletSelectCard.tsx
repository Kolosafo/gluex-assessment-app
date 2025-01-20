import Image from "next/image";
import React from "react";
import { AvailableWallets } from "../hooks/useWallet";

const WalletSelectCard = ({
  imgUri,
  title,
  onClick,
  color,
  type,
}: {
  title: string;
  imgUri: string;
  onClick: (type: AvailableWallets) => void;
  color: string;
  type: AvailableWallets;
}) => {
  return (
    <div
      onClick={() => onClick(type)}
      className={`flex cursor-pointer bg-[${color}] flex-row md:w-[70%] w-full rounded-md px-10 p-4 justify-evenly items-center`}
    >
      <Image
        src={imgUri}
        alt="wallet-icon"
        className="object-contain w-[15%]"
        height={90}
        width={90}
      />
      <span className="text-gray-800 font-semibold">{title}</span>
    </div>
  );
};

export default WalletSelectCard;
