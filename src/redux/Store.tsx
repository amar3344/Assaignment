import { configureStore } from "@reduxjs/toolkit";
import allProducts from "./ProductsSlicer"

export const Store = configureStore({
    reducer:{
        products : allProducts
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch

