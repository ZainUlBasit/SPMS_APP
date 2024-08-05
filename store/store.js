import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";
import CustomerSlice from "./Slices/CustomerSlice";
import ItemSlice from "./Slices/ItemSlice";

export const store = configureStore({
  reducer: {
    AuthState: AuthSlice,
    CustomerState: CustomerSlice,
    ItemState: ItemSlice,
  },
});
