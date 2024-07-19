import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedState {
  selectedValues: string[]; // изменили на массив
}

const initialState: SelectedState = { selectedValues: [] };

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    addSelected: (state: SelectedState, action: PayloadAction<string>) => {
      if (!state.selectedValues.includes(action.payload)) {
        state.selectedValues.push(action.payload);
      }
    },
    removeSelected: (state: SelectedState, action: PayloadAction<string>) => {
      state.selectedValues = state.selectedValues.filter(
        (value) => value !== action.payload,
      );
    },
    toggleSelected: (state: SelectedState, action: PayloadAction<string>) => {
      const isSelected: boolean = state.selectedValues.includes(action.payload);

      if (isSelected) {
        state.selectedValues = state.selectedValues.filter(
          (value) => value !== action.payload,
        );
      } else {
        state.selectedValues.push(action.payload);
      }
    },
  },
});

export const selectedReducer = selectedSlice.reducer;
export const { addSelected, removeSelected, toggleSelected } =
  selectedSlice.actions;
