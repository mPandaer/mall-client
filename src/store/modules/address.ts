import { createSlice } from '@reduxjs/toolkit';
import { AddressItem } from '@/pages/UserCenterPage/AddressForm';



interface AddressState {
  addressItem:AddressItem[]
  selectAddress?:AddressItem
}

const initialState: AddressState = {
  addressItem: [],
  selectAddress:undefined
}


const addressStore = createSlice({
  name:"address",
  initialState,
  reducers: {
    addAddress(state, action){
      const data = action.payload;
      state.addressItem.push(data);
    },
    updateAddress(state, action){
      const data = action.payload;
      // @ts-ignore
      const existItem = state.addressItem.find(item => item.addressId === data.addressId);
      if (existItem){
        existItem.city = data.city;
        existItem.username = data.username
        existItem.phone = data.phone;
        existItem.province = data.province;
        existItem.city = data.city;
        existItem.detail = data.detail;
      }
    },
    deleteAddress(state, action){
      state.addressItem = state.addressItem.filter(item => item.addressId !== action.payload.addressId);
    },
    setSelectedAddress(state, action){
      state.selectAddress = action.payload;
    }

  }
})

const {addAddress,updateAddress,deleteAddress,setSelectedAddress} = addressStore.actions;


// 导出actionCreater
export {
  addAddress,
  updateAddress,
  deleteAddress,
  setSelectedAddress
}

//导出reducer
export default addressStore.reducer;