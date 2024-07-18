import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStarWarsData } from '@helpers';
import { StarWarsData } from '@types';

export interface StarWarsListState {
  data: StarWarsData | null;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  nextPage: number | null;
  previousPage: number | null;
}

export const initialState: StarWarsListState = {
  data: null,
  isLoading: false,
  error: null,
  currentPage: 0,
  nextPage: null,
  previousPage: null,
};

export const fetchStarWarsList = createAsyncThunk(
  'starWars/fetchStarWarsList',
  async (
    params: { query: string | null; pageNumber: number | null },
    { rejectWithValue },
  ) => {
    try {
      const data = await fetchStarWarsData(params.query);
      return data;
    } catch (error) {
      return rejectWithValue('Something went wrong');
    }
  },
);

export const starWarsListSlice = createSlice({
  name: 'starWarsList',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStarWarsList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStarWarsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.nextPage = action.payload.next
          ? parseInt(action.payload.next.split('=').pop()!)
          : null;
        state.previousPage = action.payload.previous
          ? parseInt(action.payload.previous.split('=').pop()!)
          : null;
      })
      .addCase(fetchStarWarsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentPage } = starWarsListSlice.actions;
export const starWarsListReducer = starWarsListSlice.reducer;
