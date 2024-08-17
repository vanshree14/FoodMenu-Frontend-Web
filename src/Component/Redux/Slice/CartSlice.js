import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../../Api/AxiosApi";

const initialState = {
  cart: [],
  totalProduct: 0,
  cartDataTotal: 0,
  loading: false,
  error: null,

};


export const addItemToCart = createAsyncThunk("cart/add", async (payload) => {
  return apiInstance.post(`cart/add?productId=${payload.productId}&userId=${payload.userId}&productCount=${payload.productCount}&addOnIngridiantId=${payload.addOnIngridiantId}&customizeIngridiantId=${payload.customizeIngridiantId}`, payload);
});


export const CartQuntity = createAsyncThunk(
  "cart/update",
  async (payload) => {
    return apiInstance.put(
      `cart/update?cartId=${payload.cartId}&action=${payload.action}`
    );
  }
);

export const ItemToCartGet = createAsyncThunk("cart/show", async (payload) => {
  return apiInstance.get(
    `cart/show?userId=${payload.userId}&page=${payload.page}&limit=${payload.limit}&search=${payload.search}`
  );
});



const AddToCartSlice = createSlice({
  name: "AddToCartSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get cart ==============x===

    builder.addCase(ItemToCartGet.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(ItemToCartGet.fulfilled, (state, action) => {
      state.cart = action?.payload?.cart;
      state.totalProduct = action.payload.cart.totalProduct
      state.status = "succeeded";
    });
    builder.addCase(ItemToCartGet.rejected, (state, action) => {
      state.status = action.error.message || "failed";
    });




    // addd cart =============

    builder.addCase(addItemToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      if (action.payload && action.payload.cart) {
        if (!Array.isArray(state.cart)) {
          state.cart = [];
        }
        const { productId, _id } = action.payload.cart;
        if (!productId || !_id) {
          console.error('Invalid cart item:', action.payload.cart);
          return;
        }
        const inCart = state.cart.some(obj => obj.productId === productId);
        if (inCart) {
          const cartIdx = state.cart.findIndex((product) => product._id === _id);
          if (cartIdx !== -1) {
            state.cart[cartIdx] = { ...state.cart[cartIdx], ...action.payload.cart };
          }
        } else {
          state.cart.unshift(action.payload.cart);
          state.totalProduct += 1;
        }
      } else {
        console.error('Invalid payload:', action.payload);
      }
      state.cartLoader = false;
    });




    builder.addCase(addItemToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });



    // put cart =================

    builder.addCase(CartQuntity.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CartQuntity.fulfilled, (state, action) => {
      const cartIdx = state.cart.findIndex((item) => item._id === action.payload.cartData._id);
      if (cartIdx !== -1) {
        state.cart[cartIdx] = { ...state.cart[cartIdx], ...action.payload.cartData };
      }
      state.isLoading = false;
    });


    builder.addCase(CartQuntity.rejected, (state) => {
      state.isLoading = false;
    });
  },
});



export default AddToCartSlice.reducer;