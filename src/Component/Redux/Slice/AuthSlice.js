import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { apiInstance, setToken } from "../../../Api/AxiosApi";
import { SetDevKey } from "../../Utils/SetAuth";
import { baseURL, Key } from "../../../Component/Utils/Config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: [],
    isAuth: false,
    isLoading: false,
};


export const Register = createAsyncThunk("admin/login", async (payload) => {
    return apiInstance.post(`${baseURL}auth/register`, payload);
})
export const OTP = createAsyncThunk("auth/verify/otp", async (payload) => {
    return apiInstance.post(`${baseURL}auth/verify/otp`, payload);
})
export const login = createAsyncThunk("auth/login/email", async (payload) => {
    return apiInstance.post(`${baseURL}auth/login/email`, payload);
})



const authSlice = createSlice({
    name: "authslice",
    initialState,
    reducers: {
        setOldAdmin(state, action) {
            const token = JSON.parse(action.payload.token);
            state.user = token;
            state.token = action.payload.token;
            setToken(action.payload.tokenSil);
            SetDevKey(Key);
        },
        logout(state) {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("key");
            sessionStorage.removeItem("isAuth");
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('otp');
            state.user = {};
            state.isAuth = false;
        },
        setAuthToken: (state, action) => {
            state.authToken = action.payload;
        }
    },
    //   Register
    extraReducers: (builder) => {
        builder.addCase(Register.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(Register.fulfilled, (state, action) => {
            const token_ = jwtDecode(action.payload.token);
            state.user = token_;
            state.token = action.payload.token;
            state.isLoading = false;
            SetDevKey(Key);
            setToken(action.payload.token);
            sessionStorage.setItem("otp", token_.otp);
            delete token_.otp;
            sessionStorage.setItem("token", token_ ? JSON.stringify(token_) : undefined);
            sessionStorage.setItem("key", Key ? Key : undefined);
        });
        builder.addCase(Register.rejected, (state) => {
            state.isLoading = false;
        });

        // OTP
        builder.addCase(OTP.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(OTP.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isAuth = false;
            sessionStorage.setItem("isAuth", true);
        });

        builder.addCase(OTP.rejected, (state) => {
            state.isLoading = false;
        });

        // login
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            let token_ = jwtDecode(action.payload.token);
            state.user = token_;
            state.token = action.payload.token;
            state.isLoading = false;
            state.isAuth = true; 
            SetDevKey(Key);
            setToken(action.payload.token);
            sessionStorage.setItem("token", token_ ? JSON.stringify(token_) : undefined);
            sessionStorage.setItem("tokenSil", action.payload.token ? action.payload.token : undefined);
            sessionStorage.setItem("key", Key ? Key : undefined);
          });
          
        builder.addCase(login.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default authSlice.reducer;
export const { setOldAdmin, logout } = authSlice.actions;

