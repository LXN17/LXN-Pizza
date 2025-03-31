import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type CartItem = {
  id: string; // Убедись, что id действительно уникальный (возможно, включай type и size)
  title: string;
  price: number;
  imageUrl: string;
  type: number;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = (() => {
  const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  return {
    totalPrice: storedCart.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.count,
      0
    ),
    items: storedCart,
  };
})();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.items.reduce(
        (sum, obj) => sum + obj.price * obj.count,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state.items)); // Добавлено обновление localStorage
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = state.items.reduce(
        (sum, obj) => sum + obj.price * obj.count,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state.items)); // Добавлено обновление localStorage
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        if (findItem.count > 1) {
          findItem.count--;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      }
      state.totalPrice = state.items.reduce(
        (sum, obj) => sum + obj.price * obj.count,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state.items)); // Добавлено обновление localStorage
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;

      localStorage.removeItem("cart"); // Очищаем localStorage при очистке корзины
    },
  },
});

export const selectCart = (state: RootState): CartSliceState => state.cart;

export const selectCartItemById =
  (id: string, typeNames: string[], activeType: number, activeSize: number) =>
  (state: RootState): CartItem | undefined =>
    state.cart.items.find(
      (obj: CartItem) =>
        obj.id === `${id}_${typeNames[activeType]}_${activeSize}`
    );

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
