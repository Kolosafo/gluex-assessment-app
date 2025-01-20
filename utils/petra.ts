import { toast } from "react-toastify";

export const connectPetra = async () => {
  if (typeof window.aptos === "undefined") {
    return {
      account: null,
      isAvailable: false,
      error: `Petra Wallet not found`,
    };
  }
  try {
    const account = await window.aptos.connect();
    return {
      account: account.address,
      isAvailable: true,
      error: null,
    };
  } catch (error) {
    return {
      account: null,
      isAvailable: true,
      error: `Error connecting to Petra Wallet: ${error}`,
    };
  }
};

export const sendPetraTransaction = async ({
  recipientAddress,
  amountInAPT,
}: {
  recipientAddress: string;
  amountInAPT: number;
}) => {
  try {
    if (!window.aptos) {
      toast("Petra Wallet not found", {
        type: "error",
      });
      return;
    }

    // console.log("RECIPIENT ACCOUNT: ", recipientAddress);
    const payload = {
      type: "entry_function_payload",
      function: "0x1::aptos_account::transfer", // Aptos transfer function
      arguments: [recipientAddress, amountInAPT * 10 ** 8], // Amount in Aptos (1 APT = 10^8 Octas)
      type_arguments: [],
    };

    // Sign the transaction
    // const transaction = await window.aptos.signTransaction({ payload });

    // Send the transaction
    const response = await window.aptos.signAndSubmitTransaction(payload);
    // console.log("Transaction submitted:", response.hash);
    toast("Transaction successful!", {
      type: "success",
    });
  } catch (error) {
    console.error("Error sending transaction:", error);
    toast(`${error}`, {
      type: "error",
    });
  }
};
