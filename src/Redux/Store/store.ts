import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/Reducer";
import managementReducer from "../Features/Management/Reducer";
import menuReducer from "../Features/Menu/MenuReducer";
import MastersSlice from "../Features/Masters/MastersSlice";
import FundingSlice from "../Features/Fundings/slice";
import schemesSlice from "../Features/Schemes/slice";
import storageSession from "redux-persist/lib/storage/session";
import storage from "redux-persist/lib/storage"; // localStorage
import { persistReducer, persistStore } from "redux-persist";

const menuPersistConfig = {
  key: "menu", // key to use in session storage
  storage: storageSession, // storage to use
};

const authPersistConfig = {
  key: "auth",
  storage: storage, // 'storage' for localStorage
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  menu: persistReducer(menuPersistConfig, menuReducer),
  management: managementReducer,
  master: MastersSlice,
  funding: FundingSlice,
  schemes: schemesSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // required for redux-persist
});

// Setup persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
