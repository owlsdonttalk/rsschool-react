import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStarWarsDetailedData } from '../helpers';

export interface StarWarsState {
  detailedData: Record<string, string> | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: StarWarsState = {
  detailedData: null,
  isLoading: false,
  error: null,
};

export const fetchStarWarsDetails = createAsyncThunk(
  'starWars/fetchStarWarsDetails',
  async (personId: string, { rejectWithValue }) => {
    try {
      const data = await fetchStarWarsDetailedData(personId);
      return data;
    } catch (error) {
      return rejectWithValue('Something went wrong');
    }
  },
);

const starWarsSlice = createSlice({
  name: 'starWars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStarWarsDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStarWarsDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.detailedData = action.payload;
      })
      .addCase(fetchStarWarsDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const starWarsReducer = starWarsSlice.reducer;
