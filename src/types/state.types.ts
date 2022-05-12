import { EntityState } from '@reduxjs/toolkit';
import { LoadingStatus, SortingOrder } from '../const';
import { store } from '../store';
import { DataCoupledType, GuitarsIdsLineType, GuitarType, Review } from './general.types';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface GuitarState extends EntityState<GuitarType> {
  totalGuitars: null | number,
  guitarsIdPerPage: GuitarsIdsLineType,
  currentPage: number,
  guitarsStatus: LoadingStatus,
  oneGuitarStatus: LoadingStatus,
}

export interface ReviewState extends EntityState<Review> {
  reviewsStatus: LoadingStatus,
  commentStatus: LoadingStatus,
}

export type QueryParamsState = {
  filterByName: null | string,
  filterByType: null | string,
  sortBy: null | string,
  orderBy: null | SortingOrder,
  itemRangeStart: null | number,
  itemRangeEnd: null | number,
  priceRangeStart: null | number,
  priceRangeEnd: null | number,
  similarName: null | string,
  dataCoupled: DataCoupledType,
}
