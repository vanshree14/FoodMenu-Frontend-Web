import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../../Api/AxiosApi";

const initialState = {
    wishlist: [],
    wishlistTotal: 0,
    isLoading: false,

};
export const WishListCreate = createAsyncThunk("wishlist/create", async (payload) => {
    return apiInstance.post(`wishlist/create?productId=${payload.productId}&userId=${payload.userId}`, payload);
});

export const WishListGet = createAsyncThunk("wishlist/show", async (payload) => {
    return apiInstance.get(`wishlist/show?userId=${payload.userId}&page=${payload.page}&limit=${payload.limit}&search=${payload.search}`, payload);
});
export const WishListDelete = createAsyncThunk("wishlist/delete", async (wishlistId) => {
    return apiInstance.delete(`wishlist/delete?wishlistId=${wishlistId}`);
});

const WishListSlice = createSlice({
    name: "WishListSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // categoryGet
        builder.addCase(WishListCreate.pending, (state, action) => {
            state.isLoading = action.meta.arg.command;
        });
        builder.addCase(WishListCreate.fulfilled, (state, action) => {
            state.wishlist = action.payload.wishlist;
            state.wishlistTotal = action.payload.wishlistTotal;
            state.isLoading = false;
        });
        builder.addCase(WishListCreate.rejected, (state, action) => {
            state.isLoading = false;
        });

        // WishListDelete
        builder.addCase(WishListDelete.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(WishListDelete.fulfilled, (state, action) => {
            state.wishlist = state.wishlist.filter((wishlist) => wishlist._id !== action.meta.arg);
            state.wishlistTotal -= 1;
        });
        builder.addCase(WishListDelete.rejected, (state) => {
            state.isLoading = false;
        });
        // WishListGet
        builder.addCase(WishListGet.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(WishListGet.fulfilled, (state, action) => {
            state.wishlist = action.payload.wishlist;
            state.wishlistTotal = action.payload.wishlistTotal;
            state.isLoading = false;
        });
        builder.addCase(WishListGet.rejected, (state) => {
            state.isLoading = true;
        });
    },
});
export default WishListSlice.reducer;