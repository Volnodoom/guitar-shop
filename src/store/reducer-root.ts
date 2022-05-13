import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataGuitars } from './data-guitars/data-guitars';
import { dataReviews } from './data-reviews/data-reviews';
import { queryParams } from './query-params/query-params';

export const reducerRoot = combineReducers({
  [NameSpace.DataGuitars]: dataGuitars.reducer,
  [NameSpace.DataReviews]: dataReviews.reducer,
  [NameSpace.QueryParams]: queryParams.reducer,
});
