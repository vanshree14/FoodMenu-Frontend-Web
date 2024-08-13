import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../../Api/AxiosApi";

const initialState = {
  table: [],
  totalCount: 0,
  isLoading: false,
  isSkeleton: false,
};
export const bookingGet = createAsyncThunk("bookTable/show", async (payload) => {
  return apiInstance.get(`bookTable/show?page=${payload.page}&limit=${payload.limit}&search=${payload.search}`);
});


const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // bookingGet
    builder.addCase(bookingGet.pending, (state, action) => {
      state.isSkeleton = action.meta.arg.command;
    });
    builder.addCase(bookingGet.fulfilled, (state, action) => {
      state.table = action.payload.table;
      state.totalCount = action.payload.totalCount;
      state.isSkeleton = false;
    });
    builder.addCase(bookingGet.rejected, (state, action) => {
      state.isSkeleton = false;
    });
  }
});
export default bookingSlice.reducer;
