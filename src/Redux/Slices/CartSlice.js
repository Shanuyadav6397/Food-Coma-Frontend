import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance.js";

const initialState = {
    cartsData: ''
};

export const addProductToCart = createAsyncThunk('cart/addProduct', async (productId) => {
    try {
        const product = axiosInstance.post(`/cart/add/${productId}`);
        console.log("products from the backend ", product);
        toast.promise(product, {
            loading: 'Hang on! Adding the product to the cart',
            success: "Product added to cart successfully",
            error: 'Oh no! Something went wrong, please try again'
        });
        const apiResponse = await product;
        return apiResponse.data;
    } catch (error) {
        console.log(error.message);
        toast.error('Oh no! Something went wrong, please try again');
    }
});


export const removeProductFromCart = createAsyncThunk('cart/removeProduct', async (productId) => {
    try {
        const product = axiosInstance.post(`/cart/remove/${productId}`);
        console.log("products from the backend ", product);
        toast.promise(product, {
            loading: 'Hang on! Removing the product from the cart',
            success: "Product removed successfully",
            error: 'Oh no! Something went wrong cannot remove the product'
        });
        const apiResponse = await product;
        return apiResponse.data;
    } catch (error) {
        console.log(error.message);
        toast.error('Oh no! Something went wrong cannot remove the product');
    }
});

export const getCartDetails = createAsyncThunk('cart/getdetails', async () => {
    try {
        const cartDetails = axiosInstance.get('/cart/fetch');
        console.log("products from the backend ", cartDetails);
        toast.promise(cartDetails, {
            loading: 'Hang on! Fetching the cart details',
            success: "Cart details fetched successfully",
            error: 'Oh no! Something went wrong cannot fetch cart details'
        });
        const apiResponse = await cartDetails;
        return apiResponse.data;
    } catch (error) {
        console.log(error.message);
        toast.error('Oh no! Something went wrong, please try again');
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCartDetails.fulfilled, (state, action) => {
            console.log("Action payload", action);
            state.cartsData = action?.payload?.data?.data;
        });
    }
});

export default cartSlice.reducer;