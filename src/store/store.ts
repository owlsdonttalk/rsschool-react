import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './counterReducer';
import { starWarsApi } from './starWarsApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [starWarsApi.reducerPath]: starWarsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
