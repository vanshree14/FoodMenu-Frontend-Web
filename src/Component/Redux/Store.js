import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slice/AuthSlice";
import DialogueSlice from "./Slice/DialogueSlice";
import CategorySlice from "./Slice/CategorySlice";
import BookingSlice from "./Slice/BookingSlice";
import ProductSlice from "./Slice/ProductSlice";
import CartSlice from "./Slice/CartSlice";

const Store = configureStore({
    reducer: {
        user: AuthSlice,
        auth:AuthSlice,
        dialogue: DialogueSlice,
        category: CategorySlice,
        table: BookingSlice,
        product: ProductSlice,
        cart: CartSlice,
       
    },
});
export default Store
