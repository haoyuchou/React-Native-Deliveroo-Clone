import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const removeItem = state.items.findIndex((item) => {
        //console.log(item.id === action.payload.id);
        return item.id === action.payload.id;
      });

      let newBasket = [...state.items];

      //console.log(removeItem);
      if (removeItem >= 0) {
        // Start from this index, delete one
        newBasket.splice(removeItem, 1);
      } else {
        console.warn(`There is no id: ${action.payload.id} for you to remove`);
      }

      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;



export default basketSlice.reducer;
