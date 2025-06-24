import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/Reducer";
import menuReducer from "../Features/Menu/MenuReducer";
// import productMasterSlice from "../Features/Masters/ProductMaster/slice";
// import subProductMasterSlice from "../Features/Masters/SubProductMaster/slice";
// import operatorMasterSlice from "../Features/Masters/OperatorMaster/slice";
import vendorMasterSlice from "../Features/Masters/VendorMaster/slice";
import subOperatorMasterSlice from "../Features/Masters/SubOperatorMaster/slice";
import dropdownMasterSlice from "../Features/Masters/DropdownMaster/slice";
import MastersSlice from "../Features/Masters/MastersSlice";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";

const menuPersistConfig = {
  key: "menu", // key to use in session storage   
  storage: storageSession, // storage to use
};

const rootReducer = combineReducers({
  auth: authReducer,
  menu: persistReducer(menuPersistConfig, menuReducer), // only this is persisted
  masters: combineReducers({
    // product: productMasterSlice,
    // subProduct: subProductMasterSlice,
    // operator: operatorMasterSlice,
    vendor: vendorMasterSlice,
    subOperator: subOperatorMasterSlice,
    dropdown: dropdownMasterSlice,
  }),
  master: MastersSlice,
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
