import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import nftmintReducer from './nftmint';

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    nftmint: nftmintReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
