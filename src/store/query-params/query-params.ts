import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, SortingOrder } from '../../const';
import { DataCoupledType } from '../../types/general.types';
import { QueryParamsState } from '../../types/state.types';

const initialState: QueryParamsState = {
  FilterByName: null,
  FilterByType: null,
  SortBy: null,
  OrderBy: null,
  ItemRangeStart: null,
  ItemRangeEnd: null,
  ItemLimit: null,
  PriceRangeStart: null,
  PriceRangeEnd: null,
  SimilarName: null,
  DataCoupled: null,
};

export const queryParams = createSlice({
  name: NameSpace.QueryParams,
  initialState,
  reducers: {
    setFilterByName: (state, action: PayloadAction<null | string>) => {
      state.FilterByName = action.payload;
    },
    setFilterByType: (state, action: PayloadAction<null | string>) => {
      state.FilterByType = action.payload;
    },
    setSortBy: (state, action: PayloadAction<null | string>) => {
      state.SortBy = action.payload;
    },
    setOrderBy: (state, action: PayloadAction<null | SortingOrder>) => {
      state.OrderBy = action.payload;
    },
    setItemRangeStart: (state, action: PayloadAction<null | number>) => {
      state.ItemRangeStart = action.payload;
    },
    setItemRangeEnd: (state, action: PayloadAction<null | number>) => {
      state.ItemRangeEnd = action.payload;
    },
    setItemLimit: (state, action: PayloadAction<null | number>) => {
      state.ItemLimit = action.payload;
    },
    setPriceRangeStart: (state, action: PayloadAction<null | number>) => {
      state.PriceRangeStart = action.payload;
    },
    setPriceRangeEnd: (state, action: PayloadAction<null | number>) => {
      state.PriceRangeEnd = action.payload;
    },
    setSimilarName: (state, action: PayloadAction<null | string>) => {
      state.SimilarName = action.payload;
    },
    setDataCoupled: (state, action: PayloadAction<DataCoupledType>) => {
      state.DataCoupled = action.payload;
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
  setItemLimit,
  setPriceRangeStart,
  setPriceRangeEnd,
  setSimilarName,
  setDataCoupled,
} = queryParams.actions;
