import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import {  setToken } from "../../../Api/AxiosApi";
import { SetDevKey } from "../../Utils/SetAuth";
// import { setToast } from "../../component/extra/toast";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BaseURL, Key } from "../../../Component/Utils/Config";



const initialState = {
    user: [],
    otp: [],
    isAuth: false,
    isLoading: false,
};

export const Register = createAsyncThunk('auth/register', async (payload) => {
    try {
        const response = await axios.post(`${BaseURL}auth/register`, payload);
        return response.data;
    } catch (error) {
        throw (error)
    }
});

export const OTP = createAsyncThunk('auth/verify/otp', async (payload) => {
    try {
        const response = await axios.post(`${BaseURL}auth/verify/otp`, payload);
        return response.data;
    } catch (error) {
        throw (error)
    }
}
);

export const login = createAsyncThunk('auth/login/email', async (payload) => {
    try {
        const response = await axios.post(`${BaseURL}auth/login/email`, payload);
        return response.data;
    } catch (error) {
        throw (error)
    }
}
);

// export const login = createAsyncThunk(
//     "auth/login/email",
//     async (payload) => {
     
//       return apiInstance.post("auth/login/email", payload);
//     }
//   );
  

const authslice = createSlice({
    name: "authslice",
    initialState,
    reducers: {
        setOldAdmin(state, action) {
            let token_;
    
            // Check if action.payload is a string
            if (typeof action.payload === 'string') {
                try {
                    token_ = JSON.parse(action.payload);
                } catch (e) {
                    console.error("Error parsing JSON:", e);
                    return;
                }
            } else if (typeof action.payload === 'object') {
                token_ = action.payload;
            } else {
                console.error("Invalid payload type:", typeof action.payload);
                return;
            }
    
            state.user = token_;
            state.isAuth = true;
            state.token = token_.token; // Assuming token is a property of token_
            SetDevKey(Key);
        },
        logout(state, action) {
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
            let token_ = jwtDecode(action.payload.token);
            state.user = token_;
            state.isAuth = true;
            state.token = action.payload.token;
            state.isLoading = false;
      
            SetDevKey(Key);
            setToken(action.payload.token);
            sessionStorage.setItem("token",token_ ? JSON.stringify(token_) : undefined);
            // sessionStorage.setItem("tokenSil", action.payload.token ? action.payload.token : undefined);
            sessionStorage.setItem("key", Key ? Key : undefined);
            sessionStorage.setItem("isAuth", true);
          });
          builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
          });
    },
})

export default authslice.reducer
export const { setOldAdmin, logout } = authslice.actions




