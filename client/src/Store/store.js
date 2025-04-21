import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // localStorage
import { persistReducer, persistStore } from 'redux-persist';

import itemsReducer from './ItemsSlice';
import userInReducer from './AuthSlice';
import tokenReducer from './TokenSilce'; // שימי לב לשם

// שלב 1: שילוב כל הרידוסרים
const rootReducer = combineReducers({
  Items: itemsReducer,
  Token: tokenReducer,
  User: userInReducer,
});

// שלב 2: קונפיגורציית persist לכל ה-store
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// שלב 3: יצירת ה-store
export const myStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// שלב 4: יצירת persistor
export const persistor = persistStore(myStore);
