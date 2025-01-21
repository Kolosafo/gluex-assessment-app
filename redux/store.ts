import { combineReducers, configureStore } from "@reduxjs/toolkit";
import walletSlice from "./wallet/walletSlice";
import transactionSlice from "./transactions/transactionSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// PERSISTING WALLET TYPE, SINCE THE USER WOULD MOST LIKELY BE USING ONE WALLET FOR THE MOST PART
const walletTypePersistConfig = {
  key: "walletType",
  storage,
  whitelist: ["walletType"],
};

// PERSISTING TRANSACTION TYPE
const transactionPersistConfig = {
  key: "history",
  storage,
  whitelist: ["history"],
};

const Allreducer = combineReducers({
  wallet: persistReducer(walletTypePersistConfig, walletSlice),
  transactions: persistReducer(transactionPersistConfig, transactionSlice),
  // IF ANY MORE REDUX STATES ARE CREATED, WE ADD THEM HERE
});
export const store = configureStore({
  reducer: Allreducer,
});

export type IRootState = ReturnType<typeof store.getState>;
