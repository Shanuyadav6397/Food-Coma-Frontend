import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
    role: localStorage.getItem('role') || '',
    data: JSON.parse(localStorage.getItem('data')) || {}
};

export const createAccount = createAsyncThunk('auth/createAccount', async (data) => {
    console.log("Incoming data to the thunk", data);
    try {
        const response = axiosInstance.post('/user/initiate-register', data);
        toast.promise(response, {
            loading: 'Hang on! Sending OTP to your email',
            success: (resovledPromise) => {
                return resovledPromise?.data?.message || 'OTP sent successfully';
            },
            error: (rejectedPromise) => {
                return rejectedPromise?.response?.data?.message || 'Oh no! Could not send OTP, please try again';
            }
        });
        const apiResponse = await response;
        return apiResponse.data;
    } catch (error) {
        console.log("Error in sending OTP", error);
    }
});

export const otpHandel = createAsyncThunk('auth/otp', async (data) => {
    console.log("Incoming data to the otp thunk", data);
    try {
        const response = axiosInstance.post('/user/verify-otp', data);
        toast.promise(response, {
            loading: 'Hang on! Creating your account',
            success: (resovledPromise) => {
                return resovledPromise?.data?.message || 'Account created successfully';
            },
            error: 'Oh no! Could not create account, please try again'
        });
        const apiResponse = await response;
        return apiResponse.data;
    } catch (error) {
        console.log("Error in creating account", error);
    }
});

export const login = createAsyncThunk('auth/login', async (data) => {
    //console.log("Incoming data to the thunk", data);
    try {
        const response = axiosInstance.post('/auth/login', data);
        toast.promise(response, {
            loading: 'Hang on! Logging you in',
            success: (resovledPromise) => {
                //console.log("Resolved Promise", resovledPromise);
                return resovledPromise?.data?.message || 'Logged in successfully';
            },
            error: (rejectedPromise) => {
                //console.log("Rejected Promise", rejectedPromise);
                return rejectedPromise?.response?.data?.message || 'Oh no! Could not login, please try again';
            }
        });
        const apiResponse = await response;
        return apiResponse.data;
    } catch (error) {
        console.log("Error in login", error);
    }
});


export const logout = createAsyncThunk('auth/logout', async () => {
    //console.log("Incoming data to the thunk");
    try {
        const response = axiosInstance.post('/auth/logout');
        toast.promise(response, {
            loading: 'Hang on! Logging you out',
            success: (resovledPromise) => {
                //console.log("Resolved Promise", resovledPromise);
                return resovledPromise?.data?.message || 'Logged out successfully';
            },
            error: 'Oh no! Could not logout, please try again'
        });
        const apiResponse = await response;
        return apiResponse.data;
    } catch (error) {
        console.log("Error in logout", error);
    }
});


const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                // reducer when the login thunk is fulfilled
                state.isLoggedIn = true;
                state.role = action?.payload?.data?.data?.userRole;
                state.data = action?.payload?.data?.data?.userData;
                // Save the data to local storage
                localStorage.setItem('isLoggedIn', true);
                // Save the role to local storage
                localStorage.setItem('role', action?.payload?.data?.data?.userRole);
                // Save the user data to local storage
                localStorage.setItem('data', JSON.stringify(action?.payload?.data?.data?.userData));
            })
            .addCase(logout.fulfilled, (state) => {
                // reducer when the logout thunk is fulfilled
                // Save the data to local storage
                localStorage.setItem('isLoggedIn', false);
                // Save the role to local storage
                localStorage.setItem('role', '');
                // Save the user data to local storage
                localStorage.setItem('data', JSON.stringify({}));
                state.isLoggedIn = false;
                state.role = '';
                state.data = {};
            })
    }
});


export default AuthSlice.reducer;