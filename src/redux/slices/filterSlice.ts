import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Sort = {
  name: string;
  sort: string;
};

interface FilterSliceState {
  category: number;
  sortBy: Sort;
}

const initialState: FilterSliceState = {
  category: 0,
  sortBy: {
    name: "популярности",
    sort: "rating",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<number>) {
      state.category = action.payload;
    },
    setSortBy(state, action: PayloadAction<Sort>) {
      state.sortBy = action.payload;
    },
  },
});

export const { setCategory, setSortBy } = filterSlice.actions;

export const selectCategory = (state: RootState): number =>
  state.filter.category;
export const selectSort = (state: RootState): Sort => state.filter.sortBy;

export default filterSlice.reducer;
