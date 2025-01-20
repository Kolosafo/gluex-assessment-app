import {
  Connection,
  PublicKey,
  Transaction,
  Keypair,
  SystemProgram,
} from "@solana/web3.js";
import { toast } from "react-toastify";

export const connectPhantom = async () => {
  if (window.solana?.isPhantom) {
    const response = await window.solana.connect();
    try {
      return {
        account: response.publicKey.toString(),
        isAvailable: true,
        error: null,
      };
    } catch (error) {
      return {
        account: null,
        isAvailable: true,
        error: `Error connecting to Phantom Wallet: ${error}`,
      };
    }
  } else {
    return {
      account: null,
      isAvailable: false,
      error: `Phantom wallet not found`,
    };
  }
};

export const sendSol = async ({
  recipient,
  _amount,
}: {
  recipient: string;
  _amount: number;
}) => {
  try {
    const connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed"
    );

    const payer = Keypair.generate();
    // const secretKey = Uint8Array.from([userPrivateKey]); THIS IS FOR A REAL EXISTING USER PRIVATE KEY
    // const payer = Keypair.fromSecretKey(secretKey); THIS IS FOR A REAL EXISTING USER PRIVATE KEY

    const recipientPublicKey = new PublicKey(recipient);
    const amount = _amount * 10 ** 9; // <_amount> SOL in lamports (<_amount> SOL = 10^9 lamports)

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: window.solana.publicKey,
        toPubkey: recipientPublicKey,
        lamports: amount,
      })
    );
    (async () => {
      try {
        // Get the latest blockhash
        const { blockhash } = await connection.getLatestBlockhash("confirmed");
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = window.solana.publicKey;

        // Request the wallet to sign the transaction
        const signedTransaction = await window.solana.signTransaction(
          transaction
        );

        // Send the transaction
        const signature = await connection.sendRawTransaction(
          signedTransaction.serialize()
        );
        console.log("Transaction signature:", signature);

        // Confirm the transaction
        const confirmation = await connection.confirmTransaction(
          signature,
          "confirmed"
        );
        toast(`Transaction successful!`, {
          type: "success",
        });
        console.log("Transaction confirmed:", confirmation);

        return signature; // Return the transaction signature
      } catch (error) {
        console.error("Error sending transaction:", error);
        toast(`Error sending transaction`, {
          type: "error",
        });
      }
    })();
  } catch (error) {
    console.error("Error sending transaction:", error);
    toast(`Error sending transaction`, {
      type: "error",
    });
  }
};
