import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  apiInstance } from "../../../Api/AxiosApi";

const initialState = {
  product: [],
  totalCount: 0,
  isAuth: false,
  isLoading: false,
};


export const productget = createAsyncThunk("product/show", async (payload) => {
  return apiInstance.get(`product/show?page=${payload.page}&limit=${payload.limit}&search=${payload.search}`);
});

export const ProductByCodeGet = createAsyncThunk("product/productByCod", async (payload) => {
  return apiInstance.get(`product/productByCode?productCode=${payload.productCode}&size=${payload.size}`);
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


      // ProductByCodeGet
      builder.addCase(ProductByCodeGet.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(ProductByCodeGet.fulfilled, (state, action) => {
        state.product = action.payload?.product || null;
        state.isLoading = false;
      });
      builder.addCase(ProductByCodeGet.rejected, (state, action) => {
        state.isLoading = false;
      });
    }
});
export default productSlice.reducer;