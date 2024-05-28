import { createSlice } from '@reduxjs/toolkit';


export interface OrderProductItem {
  productId:string,
  productName:string,
  productSize:any,
  price:number,
  productNum:number,
}

interface OrderState {
  productItem:OrderProductItem[]
  status:any[]
}

const initialState: OrderState = {
  productItem: [],
  status:[
    {
      label:"待发货",
      value:"0"
    },
    {
      label:"运输中",
      value:"1"
    },
    {
      label:"交易完成",
      value:"2"
    },
    {
      label:"申请退款",
      value:"3"
    },
    {
      label:"已退货",
      value:"4"
    },
    {
      label:"已取消",
      value:"5"
    },
  ]
}


const orderStore = createSlice({
  name:"order",
  initialState,
  reducers: {
    setOrderProductItem(state, action){
      state.productItem = action.payload;
    },
    clearOrderProductItem(state, action){
      state.productItem = [];
    },
    setStatus(state, action){
      state.status = action.payload;
    }

  }
})

const {setOrderProductItem,clearOrderProductItem,setStatus} = orderStore.actions;


// 导出actionCreater
export {
  setOrderProductItem,
  clearOrderProductItem,
  setStatus
}

//导出reducer
export default orderStore.reducer;