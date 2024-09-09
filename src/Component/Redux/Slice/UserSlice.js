import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../../Api/AxiosApi";

const initialState = {
    user: [], 
    totalCount: 0,
    isLoading: false,
    isSkeleton: false,
};

export const userGet = createAsyncThunk("auth/show", async (payload) => {
    const response = await apiInstance.get(`auth/show?page=${payload.page}&limit=${payload.limit}&search=${payload.search}&userId=${payload.userId}`);
    return response.data; 
});

const UserSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userGet.pending, (state, action) => {
            state.isSkeleton = action.meta.arg.command;
          });
          builder.addCase(userGet.fulfilled, (state, action) => {
            state.user = action.payload?.user;
            state.totalCount = action.payload?.totalCount;
            state.isSkeleton = false;
          });
          builder.addCase(userGet.rejected, (state, action) => {
            state.isSkeleton = false;
          });
    },
});

export default UserSlice.reducer;
