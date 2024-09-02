import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../../Api/AxiosApi";

const initialState = {
  combo: [],
  totalCount: 0,
  isAuth: false,
  isSkeleton:false,
  isLoading: false,

};

export const comboget = createAsyncThunk("product/showCombo", async (payload) => {
  return apiInstance.get(`product/showCombo?page=${payload.page}&limit=${payload.limit}&search=${payload.search}`);
});

const comboSlice = createSlice({
  name: "comboSlice",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

    // comboget
    builder.addCase(comboget.pending, (state, action) => {
      state.isSkeleton = action.meta.arg.command;
    });
    builder.addCase(comboget.fulfilled, (state, action) => {
      state.combo = action.payload.combo;
      state.totalCount = action.payload.totalCount;
      state.isSkeleton = false;
    });
    builder.addCase(comboget.rejected, (state, action) => {
      state.isSkeleton = false;
    });


   
    
}
});
export default comboSlice.reducer;


