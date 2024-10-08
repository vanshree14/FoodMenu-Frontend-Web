import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../../Api/AxiosApi";

const initialState = {
  category: [],
  product: [],
  categoryTotal: 0,
  totalCount: 0,
  isLoading: false,
  isSkeleton: false,

};

export const categoryGet = createAsyncThunk("category/show", async (payload) => {
  return apiInstance.get(`category/show?page=${payload.page}&limit=${payload.limit}&search=${payload.search}`);
});
export const productsByCategoryGet = createAsyncThunk("product/ProductByCategoryId", async (payload) => {
  return apiInstance.get(`product/ProductByCategoryId?categoryId=${payload.categoryId}&page=${payload.page}&limit=${payload.limit}`);
});

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    // categoryGet
    builder.addCase(categoryGet.pending, (state, action) => {
      state.isSkeleton = action.meta.arg.command;
    });
    builder.addCase(categoryGet.fulfilled, (state, action) => {
      state.category = action.payload?.category;
      state.categoryTotal = action.payload.categoryTotal;
      state.isSkeleton = false;
    });
    builder.addCase(categoryGet.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    // productsByCategoryGet
    builder.addCase(productsByCategoryGet.pending, (state) => {
      state.isSkeleton = true;
    })
    builder.addCase(productsByCategoryGet.fulfilled, (state, action) => {
      state.product = action.payload.product;
      state.totalCount = action.payload.totalCount;
      state.isSkeleton = false;
    })
    builder.addCase(productsByCategoryGet.rejected, (state) => {
      state.isSkeleton = false;
    });


  },
});
export default categorySlice.reducer;

