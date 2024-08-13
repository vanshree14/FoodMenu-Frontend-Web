import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slice/AuthSlice";
import DialogueSlice from "./Slice/DialogueSlice";
import CategorySlice from "./Slice/CategorySlice";
import BookingSlice from "./Slice/BookingSlice";
import ProductSlice from "./Slice/ProductSlice";

const Store = configureStore({
    reducer:{
        user:AuthSlice,
        dialogue:DialogueSlice,
        category:CategorySlice,
        table:BookingSlice,
        product:ProductSlice,
    },
});
export default Store
