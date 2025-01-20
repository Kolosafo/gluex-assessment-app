export const connectKeplr = async () => {
  if (typeof window.keplr === "undefined") {
    return {
      account: null,
      isAvailable: false,
      error: `Keplr wallet not found`,
    };
  }

  try {
    await window.keplr.enable("cosmoshub-4");
    const offlineSigner = window.getOfflineSigner("cosmoshub-4");
    const accounts = await offlineSigner.getAccounts();
    console.log("OFFLINE SIGNER: ", offlineSigner)
    return {
      account: accounts[0].address,
      offlineSigner,
      isAvailable: true,
      error: null,
    };
  } catch (error) {
    return {
      account: null,
      isAvailable: true,
      error: `Error connecting to Keplr Wallet: ${error}`,
    };
  }
};
