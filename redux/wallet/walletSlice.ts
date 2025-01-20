import { AvailableWallets } from "@/app/hooks/useWallet";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  walletType: AvailableWallets | null;
  address: string | null;
  keplrOfflineSigner?: any;
};
const initailState: initialStateType = {
  walletType: null,
  address: null,
  keplrOfflineSigner: undefined,
};
const walletSlice = createSlice({
  name: "wallet",
  initialState: initailState,
  reducers: {
    connectGlobalWallet: (
      state,
      {
        payload,
      }: PayloadAction<{
        address: string | null;
        type: AvailableWallets;
        keplrOfflineSigner?: any;
      }>
    ) => {
      state.walletType = payload.type;
      state.address = payload.address;
      state.keplrOfflineSigner = payload.keplrOfflineSigner;
    },
    updateWalletType: (state, action: PayloadAction<AvailableWallets>) => {
      state.walletType = action.payload;
    },
    updateAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    removeAddress: (state) => {
      state.address = null;
    },
  },
});

export const {
  connectGlobalWallet,
  updateWalletType,
  updateAddress,
  removeAddress,
} = walletSlice.actions;
export default walletSlice.reducer;
