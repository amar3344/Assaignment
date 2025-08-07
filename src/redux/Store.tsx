import { configureStore } from "@reduxjs/toolkit";
import allProducts from "./ProductsSlicer"
import authData from "./AuthSlicer"

export const Store = configureStore({
    reducer:{
        products : allProducts,
        authData : authData
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
