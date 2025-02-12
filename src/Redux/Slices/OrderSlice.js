import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
    ordersData: null
};


export const placeOrder = createAsyncThunk('order/placeOrder', async () => {
    try {
        const order = axiosInstance.post('/order');
        console.log("order from the backend ", order);
        toast.promise(order, {
            loading: 'Hang on! Creating the order',
            success: "Order created successfully",
            error: 'Oh no! Something went wrong, please try again'
        });
        const apiResponse = await order;
        return apiResponse.data;
    } catch (error) {
        console.log(error.message);
        toast.error('Oh no! Something went wrong, please try again');
    }
});


const OrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(placeOrder.fulfilled, (state, action) => {
            state.ordersData = action?.payload?.data;
        });
    }
});

export default OrderSlice.reducer;