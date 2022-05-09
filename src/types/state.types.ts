import { EntityState } from '@reduxjs/toolkit';
import { LoadingStatus, SortingOrder } from '../const';
import { store } from '../store';
import { DataCoupledType, GuitarType, Review } from './general.types';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface GuitarState extends EntityState<GuitarType> {
  guitarsStatus: LoadingStatus,
  oneGuitarStatus: LoadingStatus,
}

export interface ReviewState extends EntityState<Review> {
  reviewsStatus: LoadingStatus,
  commentStatus: LoadingStatus,
}

export type QueryParamsState = {
  FilterByName: null | string,
  FilterByType: null | string,
  SortBy: null | string,
  OrderBy: null | SortingOrder,
  ItemRangeStart: null | number,
  ItemRangeEnd: null | number,
  ItemLimit: null | number,
  PriceRangeStart: null | number,
  PriceRangeEnd: null | number,
  SimilarName: null | string,
  DataCoupled: DataCoupledType,
}
