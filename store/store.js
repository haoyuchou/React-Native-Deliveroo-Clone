import { configureStore } from "@reduxjs/toolkit";
import basketSliceReducer from "./basketSlice";
import resturantSliceReducer from "./resturantSlice";

export const store = configureStore({
  reducer: {
    basket: basketSliceReducer,
    resturant: resturantSliceReducer,
  },
});
