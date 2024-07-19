import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './counterReducer';
import { starWarsApi } from './starWarsApi';
import { selectedReducer } from './selectedReducer.ts';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    selected: selectedReducer,
    [starWarsApi.reducerPath]: starWarsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
