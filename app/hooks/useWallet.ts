import { connectGlobalWallet } from "@/redux/wallet/walletSlice";
import { connectKeplr } from "@/utils/keplr";
import { connectMetaMask } from "@/utils/metamask";
import { connectPetra } from "@/utils/petra";
import { connectPhantom } from "@/utils/phantom";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export enum AvailableWallets {
  METAMASK = "METAMASK",
  PETRA = "PETRA",
  PHANTOM = "PHANTOM",
  KEPLR = "KEPLR",
}

interface IConnectionResponstType {
  account: string | null;
  isAvailable: boolean;
  error: null | string;
}
const useWallet = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleResponse = async (
    response: IConnectionResponstType,
    walletType: AvailableWallets
  ) => {
    if (response.error) {
      toast(response.error, {
        type: "error",
      });
      return;
    }
    dispatch(
      connectGlobalWallet({ address: response.account, type: walletType })
    );
  };
  const handleConnectWallet = (wallet: AvailableWallets) => {
    switch (wallet) {
      case AvailableWallets.METAMASK: // CONNECTING METAMASK WALLET
        (async () => {
          const connect = await connectMetaMask();
          handleResponse(connect, wallet);
        })();

        return {
          wallet: AvailableWallets.METAMASK,
        };
      case AvailableWallets.PETRA: // CONNECTING PERTRA WALLET
        (async () => {
          const connect = await connectPetra();
          handleResponse(connect, wallet);
        })();
        return {
          wallet: AvailableWallets.PETRA,
        };
      case AvailableWallets.PHANTOM: // CONNECTING PHANTOM WALLET
        (async () => {
          const connect = await connectPhantom();
          handleResponse(connect, wallet);
        })();
        return {
          wallet: AvailableWallets.PHANTOM,
        };
      case AvailableWallets.KEPLR: // CONNECTING KEPLR WALLET
        (async () => {
          const connect = await connectKeplr();
          handleResponse(connect, wallet);
        })();
        return {
          wallet: AvailableWallets.KEPLR,
        };
      default:
        return null;
    }
  };

  return {
    connectWallet: handleConnectWallet,
  };
};
export default useWallet;
