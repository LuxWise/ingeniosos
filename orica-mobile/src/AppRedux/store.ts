import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import shipSlice from "./slices/shipSlice";
import statementSlice from "./slices/statementSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  ship: shipSlice,
  statement: statementSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(/* tus middlewares adicionales aquí */),
});

export const persistor = persistStore(store);
