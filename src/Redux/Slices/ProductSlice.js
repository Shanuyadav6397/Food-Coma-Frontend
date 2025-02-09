import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
    productsData: []
}

export const getAllProducts = createAsyncThunk('product/getAllProducts', async () => {
    try {
        const products = axiosInstance.get('/product');
        console.log("products ",products);
        toast.promise(products, {
            loading: 'Hang on! Fetching all products',
            success: "Products fetched successfully",
            error: 'Oh no! Something went wrong, please try again'
        });
        const apiResponse = await products;
        return apiResponse.data;
    } catch (error) {
        console.log(error.message);
        toast.error('Oh no! Something went wrong, please try again');
    }
});

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.fulfilled, (state, action) => {
                console.log("Action payload", action.payload);
                state.productsData = action?.payload?.data;
            });
    }
});


export default productSlice.reducer;