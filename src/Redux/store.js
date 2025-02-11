import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slices/AuthSlice.js";
import ProductSliceReducer from "./Slices/ProductSlice.js";
import CartSliceReducer from "./Slices/CartSlice.js";

export const store = configureStore({
    reducer: {
        auth: AuthSliceReducer,
        product: ProductSliceReducer,
        cart: CartSliceReducer
    },
    devTools: true
});