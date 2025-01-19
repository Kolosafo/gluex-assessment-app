import { AvailableWallets } from "@/app/hooks/useWallet";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  walletType: AvailableWallets | null;
  address: string | null;
};
const initailState: initialStateType = {
  walletType: null,
  address: null,
};
const walletSlice = createSlice({
  name: "wallet",
  initialState: initailState,
  reducers: {
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

export const { updateWalletType, updateAddress, removeAddress } =
  walletSlice.actions;
export default walletSlice.reducer;
