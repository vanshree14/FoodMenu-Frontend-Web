import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../../Api/AxiosApi";

const initialState = {
  cart: [],
  totalCount: 0,
  isLoading: false,
  cartLoader: false,
  // productDetails:[],

}


export const addItemToCart = createAsyncThunk("cart/add", async (payload) => {
  return apiInstance.post(`cart/add?productId=${payload.productId}&userId=${payload.userId}&productCount=${payload.productCount}&addOnIngridiantId=${payload.addOnIngridiantId}&customizeIngridiantId=${payload.customizeIngridiantId}`, payload);
});


export const CartQuntity = createAsyncThunk(
  "cart/updateQty",
  async (payload) => {
    return apiInstance.patch(
      `cart/updateQty?userId=${payload.userId}&productId=${payload.productId}&action=${payload.action}`
    );
  }
);
export const CartQuntityUpdate = createAsyncThunk(
  "cart/update",
  async (payload) => {
    return apiInstance.patch(
      `cart/update?cartId=${payload.cartId}&action=${payload.action}`
    );
  }
);

export const ItemToCartGet = createAsyncThunk("cart/show", async (payload) => {
  return apiInstance.get(
    `cart/show?userId=${payload.userId}&page=${payload.page}&limit=${payload.limit}&search=${payload.search}`
  );
});

export const removeFromCart = createAsyncThunk("cart/delete", async (payload) => {
  return apiInstance.delete(`cart/deleteById?userId=${payload.userId}&productId=${payload.productId}`);
});

export const ProductByCodeGet = createAsyncThunk("product/productByCod", async (payload) => {
  return apiInstance.get(`product/productByCod?productCode=${payload.productCode}&size=${payload.size}`);
});


const CartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get cart ==============x===

    builder.addCase(ItemToCartGet.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ItemToCartGet.fulfilled, (state, action) => {
      console.log("Add to Cart Full Payload:", action.payload);
      
      state.cart = action.payload?.cart ; 
      state.totalCount = action.payload?.cart?.totalCount ; 
      state.isLoading = false;
    });
    
    builder.addCase(ItemToCartGet.rejected, (state, action) => {
      state.isLoading = true;
    });




    // addd cart =============

    builder.addCase(addItemToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      console.log("Add to Cart Full Payload:", action.payload);
      const cart = action.payload?.cart;
   
      if (cart) {
        const inCart = state.cart.some(obj => obj.productId === cart.productId);
   
        if (inCart) {
          const cartIdx = state.cart.findIndex((product) => product._id === cart._id);
          if (cartIdx !== -1) {
            state.cart[cartIdx] = { ...state.cart[cartIdx], ...cart };
          }
        } else {
          state.cart.unshift(cart); // Add new item to the cart
          state.totalCount += 1;
        }
      } 
      state.cartLoader = false;
    });
   
     builder.addCase(addItemToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // delete cart ===================

    builder.addCase(removeFromCart.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.cart = state.cart.filter((cart) => cart._id !== action.meta.arg);
      state.totalCount -= 1
      // state.isLoading = false;
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.isLoading = false;
    });


    builder.addCase(ProductByCodeGet.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ProductByCodeGet.fulfilled, (state, action) => {
      state.productDetails = action.payload?.product || null;
      state.isLoading = false;
    });
    builder.addCase(ProductByCodeGet.rejected, (state, action) => {
      state.isLoading = false;
    });


    // put cart =================

    builder.addCase(CartQuntity.pending, (state) => {
      state.loading = true;
    });
   builder.addCase(CartQuntity.fulfilled, (state, action) => {
    console.log("Add to Cart Full Payload:", action.payload);
    const cart = action.payload?.cart;
      if (cart) {
        const itemIndex = state.cart.findIndex((item) => item._id === cart._id);
        if (itemIndex !== -1) {
          state.cart[itemIndex] = { ...state.cart[itemIndex], ...cart };
        }
      } else {
        console.error('Cart is undefined in payload');
      }
    });
  
    builder.addCase(CartQuntity.rejected, (state, action) => {
      state.loading = false;
    });


    // put cart =================

    builder.addCase(CartQuntityUpdate.pending, (state) => {
      state.loading = true;
    });
   builder.addCase(CartQuntityUpdate.fulfilled, (state, action) => {
    console.log("Add to Cart Full Payload:", action.payload);
    const cart = action.payload?.cart;
      if (cart) {
        const itemIndex = state.cart.findIndex((item) => item._id === cart._id);
        if (itemIndex !== -1) {
          state.cart[itemIndex] = { ...state.cart[itemIndex], ...cart };
        }
      } else {
        console.error('Cart is undefined in payload');
      }
    });
  
    builder.addCase(CartQuntityUpdate.rejected, (state, action) => {
      state.loading = false;
    });
  },
});


export const { decrementQuantity, incrementQuantity } = CartSlice.actions;
export default CartSlice.reducer;