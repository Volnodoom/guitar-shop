import { EntityState } from '@reduxjs/toolkit';
import { LoadingStatus, SortingOrder, SortingSort } from '../const';
import { store } from '../store';
import { DataCoupledType, GuitarsIdsLineType, GuitarsPriceRange, GuitarType, Review } from './general.types';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface GuitarState extends EntityState<GuitarType> {
  totalGuitars: null | number,
  guitarsIdPerPage: GuitarsIdsLineType,
  currentPage: number,
  userGuitarSearch: GuitarType[],
  priceExtremes: null | GuitarsPriceRange,
  activeTab: string,
  guitarsStatus: LoadingStatus,
  oneGuitarStatus: LoadingStatus,
}

export interface ReviewState extends EntityState<Review> {
  reviewsStatus: LoadingStatus,
  commentStatus: LoadingStatus,
}

export type QueryParamsState = {
  filterByString: number[],
  filterByType: string[],
  sortBy: null | SortingSort,
  orderBy: null | SortingOrder,
  itemRangeStart: null | number,
  itemRangeEnd: null | number,
  priceRangeStart: null | number,
  priceRangeEnd: null | number,
  dataCoupled: DataCoupledType,
}
