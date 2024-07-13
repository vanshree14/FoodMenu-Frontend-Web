import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  BaseURL, Key } from "../../componets/utils/Config";
// import axios from "axios";
import { apiInstance } from "../../api/axiosApi";
import { SetDevKey } from "../../componets/utils/SetAuth";
// import { setToast } from "../../component/extra/toast";
import axios from "axios";



const initialState = {
    user: [],
    otp: [],
    userTotal: 0,
    isLoading: false,
    isSkeleton: false,
};

export const Register = createAsyncThunk('auth/register', async (payload) => {
    try {
        const response = await axios.post(`${BaseURL}auth/register`, payload);
        return response.data;
    } catch (error) {
        throw (error)
    }
}
);
// export const Register = createAsyncThunk("auth/register", async (payload) => {
//     return apiInstance.post("auth/register", payload);
//   });

// export const OTP = createAsyncThunk('auth/verify/otp', async (payload) => {
//     try {
//         const response = await axios.post(`${BaseURL}auth/verify/otp`, payload);
//         return response.data;
//     } catch (error) {
//         throw (error)
//     }
// }
// );
export const OTP = createAsyncThunk("auth/verify/otp", async (payload) => {
    return apiInstance.post("auth/verify/otp", payload);
  });

// export const login = createAsyncThunk('auth/login/email', async (payload) => {
//     try {
//         const response = await axios.post(`${BaseURL}auth/login/email`, payload);
//         return response.data;
//     } catch (error) {
//         throw (error)
//     }
// }
// );
export const login = createAsyncThunk("auth/login/email", async (payload) => {
    return apiInstance.post("auth/login/email", payload);
  });


const authslice = createSlice({
    name: "authslice",
    initialState,
    reducers: {
        setOldAdmin(state, action) {
            // debugger
            let token_ = JSON.parse(action.payload);
            state.admin = token_;
            state.isAuth = true;
            state.token = action.payload.token;
            SetDevKey(Key);
          },
          logout(state, action) {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("key");
            sessionStorage.removeItem("isAuth");
            state.admin = {};
            state.isAuth = false;
          },
          setAuthToken: (state, action) => {
            state.authToken = action.payload
          }
    },
    extraReducers: (builder) => {
        // Register
        builder.addCase(Register.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(Register.fulfilled, (state, action) => {
            state.user.unshift(action.payload.user);
            state.isLoading = false;
        });
        builder.addCase(Register.rejected, (state, action) => {
            state.isLoading = false;
        });

        // otp

        builder.addCase(OTP.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(OTP.fulfilled, (state, action) => {
            state.user.unshift(action.payload.user);
            state.isLoading = false;
        });
        builder.addCase(OTP.rejected, (state, action) => {
            state.isLoading = false;
        });
        // login

        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.user.unshift(action.payload.user);
            state.isLoading = false;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
        });
    },
})

export default authslice.reducer
export const { setOldAdmin, logout } = authslice.actions




