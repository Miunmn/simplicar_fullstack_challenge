import {configureStore} from "@reduxjs/toolkit"
import { accountReducer } from "./slices/account";
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const middleware = [logger];

const persistConfig = {
	key: 'root',
	storage,
  }
const persistedReducer = persistReducer(persistConfig, accountReducer)

export const store =  configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: middleware
})
export const persistor = persistStore(store);
