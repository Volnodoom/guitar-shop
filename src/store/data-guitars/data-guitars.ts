import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiAction, ApiRoutes, LIMIT_GUITARS_PER_PAGE, HEADER_TOTAL_NUMBER, LoadingStatus, NameSpace, QueryRoutes, ONE } from '../../const';
import { CoupledProductData, GeneralApiConfig, GuitarsIdsLineType, GuitarType } from '../../types/general.types';
import {  GuitarState, State } from '../../types/state.types';
import { separateGuitarAndReviews } from '../../utils/utils-components';
import { setReviews } from '../data-reviews/data-reviews';

const guitarsAdapter = createEntityAdapter<GuitarType>();

const initialState: GuitarState = guitarsAdapter.getInitialState({
  totalGuitars: null,
  guitarsIdPerPage: {} as GuitarsIdsLineType,
  currentPage: ONE,
  guitarsStatus: LoadingStatus.Idle,
  oneGuitarStatus: LoadingStatus.Idle,
});

export const fetchProductsAction = createAsyncThunk<GuitarType[], undefined, GeneralApiConfig>(
  ApiAction.FetchGuitars,
  async (_arg, {dispatch, getState, extra: api}) => {
    try{
      const response = await api.get<CoupledProductData[]>(ApiRoutes.Guitars, {
        params: {
          [QueryRoutes.Start]: getState()[NameSpace.QueryParams].itemRangeStart,
          [QueryRoutes.Limit]: LIMIT_GUITARS_PER_PAGE,
          [QueryRoutes.Embed]: 'comments',
        }
      });

      dispatch(setTotalGuitars(response.headers[HEADER_TOTAL_NUMBER]));

      const {guitars, reviews} = separateGuitarAndReviews(response.data);
      dispatch(setReviews(reviews));

      return guitars;
    } catch (error) {
      throw Error(`Faced problem during your request ${error}`);
    }
  }
);

export const fetchOneGuitarAction = createAsyncThunk<GuitarType, number, GeneralApiConfig>(
  ApiAction.FetchOneGuitar,
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<GuitarType>(ApiRoutes.Guitar(id));
      return data;
    } catch (error) {
      throw Error(`Faced problem during your request ${error}`);
    }
  }
);

export const dataGuitars = createSlice({
  name: NameSpace.DataGuitars,
  initialState,
  reducers: {
    setGuitarsStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.guitarsStatus = action.payload;
    },
    setTotalGuitars: (state, action: PayloadAction<null | number>) => {
      state.totalGuitars = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) =>  {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.guitarsStatus = LoadingStatus.Loading;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action: PayloadAction<GuitarType[]>) => {
        guitarsAdapter.addMany(state, action.payload);

        const ids = action.payload.map((line) => line.id);
        state.guitarsIdPerPage = {
          ...state.guitarsIdPerPage,
          [state.currentPage]: ids,
        };

        state.guitarsStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.guitarsStatus = LoadingStatus.Failed;
      })
      .addCase(fetchOneGuitarAction.pending, (state) => {
        state.oneGuitarStatus = LoadingStatus.Loading;
      })
      .addCase(fetchOneGuitarAction.fulfilled, (state, action: PayloadAction<GuitarType>) => {
        guitarsAdapter.addOne(state, action.payload);
        state.oneGuitarStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchOneGuitarAction.rejected, (state) => {
        state.oneGuitarStatus = LoadingStatus.Failed;
      });
  }
});

export const {
  setGuitarsStatus,
  setTotalGuitars,
  setCurrentPage,
} = dataGuitars.actions;

export const rtkSelectorsGuitars = guitarsAdapter.getSelectors((state: State) => state[NameSpace.DataGuitars]);

