import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './counterReducer';
import { starWarsReducer } from './starWarsDetailedDataSlice.ts';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    starWars: starWarsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
