import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataProducts } from './data-products/data-products';

export const reducerRoot = combineReducers({
  [NameSpace.DataProducts]: dataProducts.reducer,
});
