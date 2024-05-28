import { createSlice } from '@reduxjs/toolkit';
import {all as allType} from "@/services/product/ProductType"
import {all3 as allBrand} from "@/services/product/ProductBrand"
import { pageQuery } from '@/services/product/Product';

export interface CartItem {
  productId:string,
  productName:string,
  productSize:any,
  price:number,
  productNum:number
}

interface CartState {
  cartItems:CartItem[]
}

const initialState: CartState = {
  cartItems: [],
}


const cartStore = createSlice({
  name:"cart",
  initialState,
  reducers: {
    addCart(state, action){
      const data = action.payload;
      const existItem = state.cartItems.find(item => item.productId === data.productId);
      if (existItem){
        existItem.productNum++;
      }else {
        state.cartItems.push(data)
      }

    },
    delCart(state, action){
      state.cartItems = state.cartItems.filter(item => item.productId !== action.payload.productId)
    },
    clearCart(state, action){
      state.cartItems = [];
    },
    setCartItemNum(state, action){
      const item = state.cartItems.find(item => item.productId === action.payload.id);
      if (item) {
        item.productNum = action.payload.num;
      }
    }

  }
})

const {addCart,delCart,clearCart,setCartItemNum} = cartStore.actions;


// 导出actionCreater
export {
  addCart,delCart,
  clearCart,setCartItemNum
}

//导出reducer
export default cartStore.reducer;