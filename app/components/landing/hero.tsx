import { IRootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomButton from "../CustomButton";
import useWallet from "@/app/hooks/useWallet";
import ChooseWalletModal from "../ChooseWalletModal";
import { FaGithub } from "react-icons/fa";

const Hero = () => {
  const { connectWallet } = useWallet();
  const { address, walletType } = useSelector(
    (state: IRootState) => state.wallet
  );
  const [isChooseModalOpen, setIsChooseModalOpen] = useState(false);
  const handleCloseModal = () => setIsChooseModalOpen(false);

  return (
    <main className="grid lg:grid-cols-2 place-items-center pt-0 pb-8 md:pt-0 md:pb-24">
      <div className="py-6 md:order-1 md:flex justify-center hidden">
        <Image
          src={"/hero.png"}
          alt="Astronaut in the air"
          width={1000}
          height={1000}
          className="w-[65%]"
        />
      </div>
      <div>
        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight xl:tracking-tighter">
          Send Any Crypto, Anywhere, Anytime
        </h1>
        <p className="text-lg mt-4 text-slate-600 max-w-xl">
          GlueSends is a platform that allows you send crypto assets on
          different ecosystems without a hassle.
          <wbr />
          <p className="text-sm">
            Built with NextJS and TailwindCSS. For GlueX Assessment
          </p>
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {!address ? (
            <CustomButton
              address={address ?? undefined}
              btnType="button"
              title={address ? "History" : `Connect ${walletType ?? ""} Wallet`}
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                if (walletType) {
                  connectWallet(walletType);
                } else {
                  setIsChooseModalOpen(true);
                }
              }}
              onDropdownClick={() => setIsChooseModalOpen(true)}
            />
          ) : (
            ""
          )}

          <Link
            rel="noopener"
            href="https://github.com/Kolosafo/gluex-assessment-app"
            className="flex gap-1 items-center justify-center"
            target="_blank"
          >
            <FaGithub className="w-4 h-4" />
            GitHub Repo
          </Link>
        </div>
      </div>
      <ChooseWalletModal
        isOpen={isChooseModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
};

export default Hero;
