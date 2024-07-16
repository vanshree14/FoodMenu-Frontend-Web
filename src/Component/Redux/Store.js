import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slice/AuthSlice";
import DialogueSlice from "./Slice/DialogueSlice";

const store = configureStore({
    reducer:{
        user:AuthSlice,
        dialogue:DialogueSlice
    }
})
export default store
