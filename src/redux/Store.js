import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slice/AuthSlice";

const store = configureStore({
    reducer:{
        user:AuthSlice
    }
})
export default store
