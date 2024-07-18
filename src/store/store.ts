import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './counterReducer';
import { starWarsReducer } from './starWarsDetailedDataSlice';
import { starWarsListReducer } from './starWarsListSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    starWars: starWarsReducer,
    starWarsList: starWarsListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
