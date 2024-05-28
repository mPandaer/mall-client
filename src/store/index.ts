import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistReducer, persistStore } from 'redux-persist';
// 这个是将状态存储在本地
import storage from 'redux-persist/es/storage';

import userReducer from './modules/user';
import productReducer from './modules/product';
import cartReducer from './modules/cart';
import orderReducer from './modules/order';
import addressReducer from './modules/address';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'product',"cart","order","address"],
  stateReconciler: autoMergeLevel2
};

const reducer: any = combineReducers({
  user:userReducer,
  product: productReducer,
  cart:cartReducer,
  order:orderReducer,
  address:addressReducer,
});

/**
 * 解决数据状态不持久化
 */
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  // @ts-ignore
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({serializableCheck:false})
  }
});

export const persistor = persistStore(store);

/** */
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
//
// export const useAppDispatch = () => useDispatch<any>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
