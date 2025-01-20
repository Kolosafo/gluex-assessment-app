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
  // KEPLR = "KEPLR", /// KEPLR WILL NOT BE USED AS REQUIRES AN SDK (THIRD PARTY TO WORK PROPERLY)
}

interface IConnectionResponstType {
  account: string | null;
  isAvailable: boolean;
  error: null | string;
  offlineSigner?: any;
}
const useWallet = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleResponse = async (
    response: IConnectionResponstType,
    walletType: AvailableWallets
  ) => {
    // console.log("RESPONSE: ", response);
    if (response.error) {
      toast(response.error, {
        type: "error",
      });
      return;
    }
    // console.log("USER ADDRESS: ", response.account);
    dispatch(
      connectGlobalWallet({
        address: response.account,
        type: walletType,
        keplrOfflineSigner: response.offlineSigner,
      })
    );
    toast(`Wallet connected successfully!`, {
      type: "success",
    });
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
      // case AvailableWallets.KEPLR: // CONNECTING KEPLR WALLET
      //   (async () => {
      //     const connect = await connectKeplr();
      //     handleResponse(connect, wallet);
      //   })();
      //   return {
      //     wallet: AvailableWallets.KEPLR,
      //   };
      default:
        return null;
    }
  };

  return {
    connectWallet: handleConnectWallet,
  };
};
export default useWallet;
