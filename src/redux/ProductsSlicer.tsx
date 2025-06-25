import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
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
    "image":string,
    "rating": number
}[]

interface IS{
    products:IProducts[],
    loading:boolean,
}

const initialState:IS = {
    products:[],
    loading:false,
}

export const getProductsApi = createAsyncThunk(
    "getProductsApi",
    async(_,{getState,fulfillWithValue,rejectWithValue}) =>{
        try{
            const apiResponse = await fetch("https://fakestoreapiserver.reactbd.org/api/products")
            const response = await apiResponse.json()
            return fulfillWithValue(response.data)
        }catch(error){
            return rejectWithValue(JSON.stringify("products" + error))
        }
    }
)

const allProductsSlicer = createSlice({
    initialState:initialState,
    name:"allProductsSlicer",
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getProductsApi.pending,(state,action)=>{
        state.loading = true
        })
        builder.addCase(getProductsApi.fulfilled,(state,action)=>{
            state.loading = false
            state.products = action.payload
        })
    }
})

export default allProductsSlicer.reducer