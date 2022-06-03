import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, SortingOrder, SortingSort } from '../../const';
import { DataCoupledType } from '../../types/general.types';
import { QueryParamsState } from '../../types/state.types';

export const initialState: QueryParamsState = {
  filterByName: null,
  filterByType: null,
  sortBy: null,
  orderBy: null,
  itemRangeStart: 0,
  itemRangeEnd: null,
  priceRangeStart: null,
  priceRangeEnd: null,
  similarName: null,
  dataCoupled: null,
};

export const queryParams = createSlice({
  name: NameSpace.QueryParams,
  initialState,
  reducers: {
    setFilterByName: (state, action: PayloadAction<null | string>) => {
      state.filterByName = action.payload;
    },
    setFilterByType: (state, action: PayloadAction<null | string>) => {
      state.filterByType = action.payload;
    },
    setSortBy: (state, action: PayloadAction<null | SortingSort>) => {
      state.sortBy = action.payload;
    },
    setOrderBy: (state, action: PayloadAction<null | SortingOrder>) => {
      state.orderBy = action.payload;
    },
    setItemRangeStart: (state, action: PayloadAction<number>) => {
      state.itemRangeStart = action.payload;
    },
    setItemRangeEnd: (state, action: PayloadAction<null | number>) => {
      state.itemRangeEnd = action.payload;
    },
    setPriceRangeStart: (state, action: PayloadAction<null | number>) => {
      state.priceRangeStart = action.payload;
    },
    setPriceRangeEnd: (state, action: PayloadAction<null | number>) => {
      state.priceRangeEnd = action.payload;
    },
    setSimilarName: (state, action: PayloadAction<null | string>) => {
      state.similarName = action.payload;
    },
    setDataCoupled: (state, action: PayloadAction<DataCoupledType>) => {
      state.dataCoupled = action.payload;
    },
  }
});

export const {
  setFilterByName,
  setFilterByType,
  setSortBy,
  setOrderBy,
  setItemRangeStart,
  setItemRangeEnd,
  setPriceRangeStart,
  setPriceRangeEnd,
  setSimilarName,
  setDataCoupled,
} = queryParams.actions;
