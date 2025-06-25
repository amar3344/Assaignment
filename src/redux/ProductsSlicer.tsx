import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";

export interface IProducts {
    "_id": number,
    "title": string,
    "isNew": boolean,
    "oldPrice": string,
    "price": number,
    "discountedPrice": number,
    "description": string,
    "category": string,
    "type": string,
    "stock": number,
    "brand": string,
    "size": [
        string,
        string,
        string
    ],
    "image": string,
    "rating": number,
    "count" : number
}[]

interface IS {
    products: IProducts[],
    loading: boolean,
    currentPage: number,
    totalPages: number,
    hasMore: boolean,
    cart:IProducts[]
}

const initialState: IS = {
    products: [],
    loading: false,
    currentPage: 1,
    totalPages: 3,
    hasMore: true,
    cart:[],
}

export const getProductsApi = createAsyncThunk(
    "getProductsApi",
    async ({ currentPage }: { currentPage: number }, { getState, fulfillWithValue, rejectWithValue }) => {
        try {
            const apiResponse = await fetch(`https://fakestoreapiserver.reactbd.org/api/products?perPage=10&page=${currentPage}`)
            const response = await apiResponse.json()
            return fulfillWithValue(response)
        } catch (error) {
            return rejectWithValue(JSON.stringify("products" + error))
        }
    }
)

const allProductsSlicer = createSlice({
    initialState: initialState,
    name: "allProductsSlicer",
    reducers: {
        resetProducts(state) {
            state.products = [];
            state.currentPage = 1;
            state.hasMore = true;
        },
        addITemToCart(state,action){
            state.cart = action.payload.cart
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getProductsApi.pending, (state, action) => {
            if(state.currentPage === state.totalPages){
                state.loading = false
            }else{
                state.loading = true
            }
        })
        builder.addCase(getProductsApi.fulfilled, (state, action) => {
            state.loading = false
            state.currentPage = action.payload.currentPage,
                state.totalPages = action.payload.totalPages,
                state.products = action.payload.data.length > 0 ? [...state.products, ...action.payload.data] : []
            if (action.payload.data.length === 0 && state.currentPage >= state.totalPages) {
                state.hasMore = false;
            }
        })
        builder.addCase(getProductsApi.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export const { resetProducts ,addITemToCart} = allProductsSlicer.actions;
export default allProductsSlicer.reducer;