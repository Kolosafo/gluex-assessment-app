import { AvailableWallets } from "@/app/hooks/useWallet";

export const WalletsList = [
  {
    title: "Meta Mask Wallet",
    imgUri: "/metamask.png",
    color: "#fe891f",
    type: AvailableWallets.METAMASK
  },
  {
    title: "Phantom Wallet",
    imgUri: "/phantom.png",
    color: "#aa9ef1",
    type: AvailableWallets.PHANTOM
  },
  // {
  //   title: "Keplr Wallet",
  //   imgUri: "/keplr.png",
  //   color: "#2f99ec",
  //   type: AvailableWallets.KEPLR
  // },
  {
    title: "Petra Wallet",
    imgUri: "/petra.png",
    color: "#ff6262",
    type: AvailableWallets.PETRA
  },
];
