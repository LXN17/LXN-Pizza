import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
  },
});

export const { setCategory, setSortBy } = filterSlice.actions;

export const selectCategory = (state) => state.filter.category;
export const selectSort = (state) => state.filter.sortBy;

export default filterSlice.reducer;
