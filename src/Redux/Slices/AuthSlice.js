import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
    role: localStorage.getItem('role') || '',
    data: JSON.parse(localStorage.getItem('data')) || {}
};

export const createAccount = createAsyncThunk('auth/createAccount', async (data) => {
    console.log("Incoming data to the thunk", data);
    try {
        const response = axiosInstance.post('/user/register', data);
        toast.promise(response, {
            loading: 'Hang on! Creating your account',
            success: (resovledPromise) => {
                resovledPromise?.data?.message;
            },
            error: 'Oh no! Something went wrong, please try again'
        });
        const apiResponse = await response;
        return apiResponse;
    } catch (error) {
        console.log("Error in creating account", error);
    }
});


const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
});


export default AuthSlice.reducer;