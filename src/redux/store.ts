import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";
import pizzasSlice from "./slices/pizzasSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    pizzas: pizzasSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
