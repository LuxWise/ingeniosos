import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './features/authSlice.js';
import userSlice from './features/userSlice.js';
import sesionSlice from './features/sesionSlice.js';
import cartSlice from './features/cartSlice.js'
import supportSlice from './features/supportSlice.js';
import lastQuoteSlice from './features/lastQuote.js'
import logoutSlice from './features/logoutSlice.js';
import quoteSlice from './features/quoteSlice.js';
import routesSlice from './features/routesSlice.js';
import previewSlice from './features/previewSlice.js'
import reviewSlice from './features/reviewSlice.js'
import proformaSlice from './features/proformaSlice.js';
import chatSlice from './features/chatSlice.js'
import mailSlice from './features/mailSlice.js'
import shipSlice from './features/shipmentSlice.js'
import divideSlice from './features/divideSlice.js'
import orderNameSlice from './features/orderNameSlice.js';

const persistConfig = {
  key: 'info',
  storage,
  whitelist: ['user', 'cart', 'route', 'preview', 'review', 'divide'],
  blacklist: ['auth', 'sesion', 'support', 'lastQuote', 'logout', 'quote', 'proforma', 'mail', 'ship', 'orderName']
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  quote: quoteSlice,
  auth: authReducer,
  user: userSlice,
  sesion: sesionSlice,
  cart: cartSlice,
  support: supportSlice,
  lastQuote: lastQuoteSlice,
  logout: logoutSlice,
  route: routesSlice,
  preview: previewSlice,
  review: reviewSlice,
  proforma: proformaSlice,
  chat: chatSlice,
  mail: mailSlice,
  ship: shipSlice,
  divide: divideSlice,
  orderName: orderNameSlice
}));

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
});

export const persistor = persistStore(store);
