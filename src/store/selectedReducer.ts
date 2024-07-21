import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedState {
  selectedValues: Record<string, string>[];
}

const initialState: SelectedState = { selectedValues: [] };

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    toggleSelected: (
      state: SelectedState,
      action: PayloadAction<Record<string, string>>,
    ) => {
      const isSelected: boolean =
        state.selectedValues.filter((el) => el.id === action.payload?.id)
          .length > 0;

      if (isSelected) {
        state.selectedValues = state.selectedValues.filter(
          (value) => value.id !== action.payload.id,
        );
      } else {
        state.selectedValues.push(action.payload);
      }
    },
    deselectAll: (state: SelectedState) => {
      state.selectedValues = [];
    },
  },
});

export const selectedReducer = selectedSlice.reducer;
export const { toggleSelected, deselectAll } = selectedSlice.actions;
