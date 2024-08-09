import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slice/AuthSlice";
import DialogueSlice from "./Slice/DialogueSlice";
import CategorySlice from "./Slice/CategorySlice";

const Store = configureStore({
    reducer:{
        user:AuthSlice,
        dialogue:DialogueSlice,
        category:CategorySlice,
    }
})
export default Store
