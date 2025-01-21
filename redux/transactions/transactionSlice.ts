import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type HistoryType = {
  id: string;
  senderAddress: string;
  recipientAddress: string;
  amount: number;
  currency: "SOL" | "ETH" | "APTOS";
  dateTime: string;
  status: "success" | "failed";
};
type initialStateType = {
  history: HistoryType[];
};
const initailState: initialStateType = {
  history: [],
};
const transactionSlice = createSlice({
  name: "transaction",
  initialState: initailState,
  reducers: {
    removeFromHistory: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: string;
      }>
    ) => {
      const filterOut = state.history.filter((item) => item.id !== payload.id);
      state.history = filterOut;
    },
    addToHistory: (state, { payload }: PayloadAction<HistoryType>) => {
      state.history = [payload, ...state.history];
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const { removeFromHistory, addToHistory, clearHistory } =
  transactionSlice.actions;
export default transactionSlice.reducer;
