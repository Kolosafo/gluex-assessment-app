import { ethers } from "ethers";
import { toast } from "react-toastify";

export const connectMetaMask = async () => {
  if (typeof window.ethereum === "undefined") {
    return {
      account: null,
      isAvailable: false,
      error: "Cannot detect MetaMask",
    };
  }
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // // console.log("ACCOUNTS: ", accounts)
    return {
      account: accounts[0],
      isAvailable: true,
      error: null,
    };
  } catch (error) {
    return {
      account: null,
      isAvailable: true,
      error: `Error connecting to MetaMask: ${error}`,
    };
  }
};

export const sendEth = async ({
  setError,
  setTxs,
  ether,
  addr,
}: {
  setError: (msg: string) => void;
  setTxs?: any;
  ether: string;
  addr: string;
}) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    // console.log("SIGNER?: ", signer);
    // Validate address before sending transaction
    try {
      ethers.getAddress(addr);
    } catch (error) {
      throw new Error("Invalid recipient address.");
    }

    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.parseEther(ether),
    });
    toast(`Transaction successful!`, {
      type: "success",
    });
    // console.log({ ether, addr });
    // // console.log("tx", tx);
    // setTxs([tx]);
    return true;
  } catch (err: any) {
    if (err.message.includes("insufficient funds")) {
      toast(`insufficient funds`, {
        type: "error",
      });
      setError("insufficient funds");
      return;
    }
    toast(err.msg, {
      type: "error",
    });
    return false;
  }
};
