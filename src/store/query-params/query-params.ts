import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, ONE, SortingOrder, SortingSort } from '../../const';
import { DataCoupledType } from '../../types/general.types';
import { QueryParamsState } from '../../types/state.types';

export const initialState: QueryParamsState = {
  filterByString: [],
  filterByType: [],
  sortBy: null,
  orderBy: null,
  itemRangeStart: 0,
  itemRangeEnd: null,
  priceRangeStart: null,
  priceRangeEnd: null,
  dataCoupled: null,
};

export const queryParams = createSlice({
  name: NameSpace.QueryParams,
  initialState,
  reducers: {
    addFilterByString: (state, action: PayloadAction<number>) => {
      const isStoreHasItem = state.filterByString.some((value) => value === action.payload);
      if(!isStoreHasItem) {
        state.filterByString = [...state.filterByString, action.payload];
      }
    },
    removeFilterByString: (state, action: PayloadAction<number>) => {
      const index = state.filterByString.findIndex((value) => value === action.payload);
      if(index >= 0) {
        state.filterByString.splice(index, ONE);
      }
    },
    addFilterByType: (state, action: PayloadAction<string>) => {
      const isStoreHasItem = state.filterByType.some((value) => value === action.payload);
      if(!isStoreHasItem) {
        state.filterByType = [...state.filterByType, action.payload];
      }
    },
    removeFilterByType: (state, action: PayloadAction<string>) => {
      const index = state.filterByType.findIndex((value) => value === action.payload);
      if(index >= 0) {
        state.filterByType.splice(index, ONE);
      }
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
    setDataCoupled: (state, action: PayloadAction<DataCoupledType>) => {
      state.dataCoupled = action.payload;
    },
    clearQueryParams: (state) => {
      state.filterByString = [];
      state.filterByType = [];
      state.priceRangeStart = null;
      state.priceRangeEnd = null;
      state.sortBy = null;
      state.orderBy = null;
    },
  }
});

export const {
  addFilterByString,
  removeFilterByString,
  setSortBy,
  setOrderBy,
  setItemRangeStart,
  setItemRangeEnd,
  setPriceRangeStart,
  setPriceRangeEnd,
  setDataCoupled,
  clearQueryParams,
  addFilterByType,
  removeFilterByType,
} = queryParams.actions;
