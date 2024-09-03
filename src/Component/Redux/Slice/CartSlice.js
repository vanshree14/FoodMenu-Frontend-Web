import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../../Api/AxiosApi";

const initialState = {
  cart: [],
  totalCount: 0,
  isLoading: false,
  // cartLoader: false,
};

// Thunks
export const addItemToCart = createAsyncThunk("cart/add", async (payload) => {
  return apiInstance.post(`cart/add?productId=${payload.productId}&userId=${payload.userId}&productCount=${payload.productCount}&addOnIngridiantId=${payload.addOnIngridiantId}&customizeIngridiantId=${payload.customizeIngridiantId}`, payload);
});

export const CartEdit = createAsyncThunk("cart/updateDetails", async (payload) => {
  return apiInstance.patch(`cart/updateDetails?cartId=${payload.cartId}&addOnIngridiantId=${payload.addOnIngridiantId}&customizeIngridiantId=${payload.customizeIngridiantId}`, payload);
});

export const CartQuntity = createAsyncThunk("cart/updateQty", async (payload) => {
  return apiInstance.patch(`cart/updateQty?userId=${payload.userId}&productId=${payload.productId}&action=${payload.action}`);
});

export const CartQuntityUpdate = createAsyncThunk("cart/update", async (payload) => {
  return apiInstance.patch(`cart/update?cartId=${payload.cartId}&action=${payload.action}`);
});

export const ItemToCartGet = createAsyncThunk("cart/show", async (payload) => {
  return apiInstance.get(`cart/show?userId=${payload.userId}&page=${payload.page}&limit=${payload.limit}&search=${payload.search}`);
});

export const removeFromCart = createAsyncThunk("cart/deleteByProduct", async (payload) => {
  return apiInstance.delete(`cart/deleteById?userId=${payload.userId}&productId=${payload.productId}`);
});

export const DeleteFromCart = createAsyncThunk("cart/deleteById", async (cartId) => {
  return apiInstance.delete(`cart/delete?cartId=${cartId}`);
});

export const ProductByCodeGet = createAsyncThunk("product/productByCod", async (payload) => {
  return apiInstance.get(`product/productByCod?productCode=${payload.productCode}&size=${payload.size}`);
});

// Slice
const CartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    // get cart
    builder.addCase(ItemToCartGet.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ItemToCartGet.fulfilled, (state, action) => {
      state.cart = action.payload.cart;
      state.totalCount = action.payload.totalCount;
      state.isLoading = false;
    });
    builder.addCase(ItemToCartGet.rejected, (state) => {
      state.isLoading = true;
    });

    // delete cart by product
    builder.addCase(removeFromCart.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.cart = state.cart.filter((cart) => cart._id !== action.meta.arg);
      state.totalCount -= 1;
    });
    builder.addCase(removeFromCart.rejected, (state) => {
      state.isLoading = false;
    });

    // delete cart by ID
    builder.addCase(DeleteFromCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteFromCart.fulfilled, (state, action) => {
      state.cart = state.cart.filter((cart) => cart._id !== action.meta.arg);
      state.totalCount -= 1;
    });
    builder.addCase(DeleteFromCart.rejected, (state) => {
      state.isLoading = false;
    });

    // add to cart
    builder.addCase(addItemToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      const cart = action.payload?.cart;
      if (cart) {
        const inCart = state.cart.some(obj => obj.productId === cart.productId);
        if (inCart) {
          const cartIdx = state.cart.findIndex((product) => product._id === cart._id);
          if (cartIdx !== -1) {
            state.cart[cartIdx] = { ...state.cart[cartIdx], ...cart };
          }
        } else {
          state.cart.unshift(cart);
          state.totalCount += 1;
        }
      }
      state.isLoading = false;
    });
    builder.addCase(addItemToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // update cart details
    builder.addCase(CartEdit.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CartEdit.fulfilled, (state, action) => {
      const cart = action.payload?.cart;
      if (cart) {
        const itemIndex = state.cart.findIndex((item) => item._id === cart._id);
        if (itemIndex !== -1) {
          state.cart[itemIndex] = { ...state.cart[itemIndex], ...cart };
        }
      }
      state.isLoading = false;
    });
    builder.addCase(CartEdit.rejected, (state) => {
      state.isLoading = false;
    });

    // update cart quantity
    builder.addCase(CartQuntity.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CartQuntity.fulfilled, (state, action) => {
      const cart = action.payload?.cart;
      if (cart) {
        const itemIndex = state.cart.findIndex((item) => item._id === cart._id);
        if (itemIndex !== -1) {
          state.cart[itemIndex] = { ...state.cart[itemIndex], ...cart };
        }
      }
    });
    builder.addCase(CartQuntity.rejected, (state) => {
      state.isLoading = false;
    });

    // update cart quantity by ID
    builder.addCase(CartQuntityUpdate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CartQuntityUpdate.fulfilled, (state, action) => {
      const cart = action.payload?.cart;
      if (cart) {
        const itemIndex = state.cart.findIndex((item) => item._id === cart._id);
        if (itemIndex !== -1) {
          state.cart[itemIndex] = { ...state.cart[itemIndex], ...cart };
        }
      }
    });
    builder.addCase(CartQuntityUpdate.rejected, (state) => {
      state.isLoading = false;
    });

    // fetch product by code
    builder.addCase(ProductByCodeGet.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ProductByCodeGet.fulfilled, (state, action) => {
      state.productDetails = action.payload?.product || null;
      state.isLoading = false;
    });
    builder.addCase(ProductByCodeGet.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default CartSlice.reducer;
