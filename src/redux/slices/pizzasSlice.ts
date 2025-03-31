import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type FetchPizzasParams = {
  category: number;
  sortBy: string;
  currentPage: number;
};

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  rating: number;
};

interface PizzasSliceState {
  items: Pizza[];
  status: "loading" | "success" | "error";
}

const initialState: PizzasSliceState = {
  items: [],
  status: "loading",
};

export const fetchPizzas = createAsyncThunk<
  Pizza[],
  FetchPizzasParams,
  { rejectValue: string }
>("pizza/fetchPizzasById", async (params, thunkAPI) => {
  try {
    const { category, sortBy, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://67d9701c00348dd3e2ab1401.mockapi.io/Pizzas?page=${currentPage}&limit=8&${
        category > 0 ? `category=${category}` : ""
      }&sortBy=${sortBy}`
    );
    if (data.length === 0) {
      return thunkAPI.rejectWithValue("No pizzas found");
    }
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch pizzas");
  }
});

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(
        fetchPizzas.fulfilled,
        (state, action: PayloadAction<Pizza[]>) => {
          state.items = action.payload;
          state.status = "success";
        }
      )
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const { setItems } = pizzasSlice.actions;
export const selectPizzasData = (state: RootState): PizzasSliceState =>
  state.pizzas;

export default pizzasSlice.reducer;
