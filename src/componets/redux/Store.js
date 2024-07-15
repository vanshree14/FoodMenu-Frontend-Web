import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slice/AuthSlice";
import DialogueSlice from "./slice/DialogueSlice";

const store = configureStore({
    reducer:{
        user:AuthSlice,
        dialogue:DialogueSlice
    }
})
export default store
