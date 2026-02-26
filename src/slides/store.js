import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import ConvertApi from "./convertSlide";

const store = configureStore({
  reducer: {
    
    [ConvertApi.reducerPath]: ConvertApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat( ConvertApi.middleware),
});

export default store;