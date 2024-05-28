import { createSlice } from '@reduxjs/toolkit';
import {all as allType} from "@/services/product/ProductType"
import {all3 as allBrand} from "@/services/product/ProductBrand"
import { pageQuery } from '@/services/product/Product';

interface ProductState {
  types: API.ProductTypeVO[];
  brands:API.ProductBrandVO[];
  products:API.ProductVO[];
  searchKeyWord:string;
}

const initialState: ProductState = {
  types:[],
  brands:[],
  products:[],
  searchKeyWord:"",
}


const productStore = createSlice({
  name:"product",
  initialState,
  reducers: {
    setTypes(state, action){
      state.types = action.payload;
    },
    setProducts(state, action){
      state.products = action.payload;
    },
    setBrands(state, action){
      state.brands = action.payload;
    },
    setSearchKeyWord(state, action){
      state.searchKeyWord = action.payload;
    }
  }
})

const {setTypes,setProducts,setBrands,setSearchKeyWord} = productStore.actions;

const fetchTypes = () => {
  return async (dispatch:any) => {
    const resp:API.RespListProductTypeVO = await allType()
    const res = resp.data?.slice(0,6);
    dispatch(setTypes(res ?? []))
  }
}

const fetchBrands = () => {
  return async (dispatch:any) => {
    const resp:API.RespListProductBrandVO = await allBrand()
    const res = resp.data?.slice(0,8) ?? [];
    dispatch(setBrands(res))
  }
}

const fetchProducts = () => {
  return async (dispatch:any) => {
    const resp:API.RespPageProductVO = await pageQuery({pageSize:24,currentPage:1})
    const res = resp.data?.records ?? []
    dispatch(setProducts(res))
  }
}

// 导出actionCreater
export {
  fetchTypes,setTypes,
  fetchProducts,setProducts,
  fetchBrands,setBrands,
  setSearchKeyWord
}

//导出reducer
export default productStore.reducer;