import { combineReducers, configureStore } from "@reduxjs/toolkit";
import walletSlice from "./wallet/walletSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// PERSISTING WALLET TYPE, SINCE THE USER WOULD MOST LIKELY BE USING ONE WALLET FOR THE MOST PART
const walletTypePersistConfig = {
  key: "walletType",
  storage,
  whitelist: ["walletType"],
};
const Allreducer = combineReducers({
  wallet: persistReducer(walletTypePersistConfig, walletSlice),
  // IF ANY MORE REDUX STATES ARE CREATED, WE ADD THEM HERE
});
export const store = configureStore({
  reducer: Allreducer,
});

export type IRootState = ReturnType<typeof store.getState>;
