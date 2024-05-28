import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser } from '@/services/user/User';


const userStore = createSlice({
  name:"user",
  initialState:{
    currentUser:{}
  },
  reducers: {
    setCurrentUser(state, action){
      state.currentUser = action.payload;
    }
  }
})

const {setCurrentUser} = userStore.actions;

const fetchCurrentUser = () => {
  return async (dispatch:any) => {
    const resp = await getCurrentUser()
    dispatch(setCurrentUser(resp.data))
  }
}

// 导出actionCreater
export {fetchCurrentUser,setCurrentUser}

//导出reducer
export default userStore.reducer;