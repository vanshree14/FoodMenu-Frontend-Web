import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  apiInstance } from "../../../Api/AxiosApi";

const initialState = {
  product: [],
  totalCount: 0,
  isAuth: false,
  isLoading: false
};


export const productget = createAsyncThunk("product/show", async (payload) => {
  return apiInstance.get(`product/show?page=${payload.page}&limit=${payload.limit}&search=${payload.search}`);
});

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
  
    },
    extraReducers: (builder) => {
      // productget
      builder.addCase(productget.pending, (state, action) => {
        state.isSkeleton = action.meta.arg.command;
      });
      builder.addCase(productget.fulfilled, (state, action) => {
        state.product = action.payload.product;
        state.totalCount = action.payload.totalCount;
        state.isSkeleton = false;
      });
      builder.addCase(productget.rejected, (state, action) => {
        state.isSkeleton = false;
      });
    }
});
export default productSlice.reducer;