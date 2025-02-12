import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slices/AuthSlice.js";
import ProductSliceReducer from "./Slices/ProductSlice.js";
import CartSliceReducer from "./Slices/CartSlice.js";
import OrderSliceReducer from "./Slices/OrderSlice.js";

export const store = configureStore({
    reducer: {
        auth: AuthSliceReducer,
        product: ProductSliceReducer,
        cart: CartSliceReducer,
        order: OrderSliceReducer
    },
    devTools: true
});