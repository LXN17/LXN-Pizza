import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasById",
  async (params, thunkAPI) => {
    const { category, sortBy, currentPage } = params;

    const { data } = await axios.get(
      `https://67d9701c00348dd3e2ab1401.mockapi.io/Pizzas?page=${currentPage}&limit=8&${
        category > 0 ? `category=${category}` : ""
      }&sortBy=${sortBy}`
    );
    if (data.length === 0) {
      return thunkAPI.rejectWithValue();
    }
    return thunkAPI.fulfillWithValue(data);
  }
);

const initialState = {
  items: [""],
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const { setItems } = pizzasSlice.actions;
export const selectPizzasData = (state) => state.pizzas;

export default pizzasSlice.reducer;
