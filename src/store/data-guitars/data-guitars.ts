import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiAction, ApiRoutes, LoadingStatus, NameSpace, QueryRoutes } from '../../const';
import { CoupledProductData, GeneralApiConfig, GuitarType } from '../../types/general.types';
import {  GuitarState, State } from '../../types/state.types';
import { separateGuitarAndReviews } from '../../utils/utils-components';
import { setReviews } from '../data-reviews/data-reviews';

const guitarsAdapter = createEntityAdapter<GuitarType>();

const initialState: GuitarState = guitarsAdapter.getInitialState({
  guitarsStatus: LoadingStatus.Idle,
  oneGuitarStatus: LoadingStatus.Idle,
});

export const fetchGuitarsAction = createAsyncThunk<GuitarType[], undefined, GeneralApiConfig>(
  ApiAction.FetchGuitars,
  async (_arg, {dispatch, getState, extra: api}) => {
    try{
      const {data} = await api.get<CoupledProductData[]>(ApiRoutes.Guitars, {
        params: {
          // [QueryRoutes.Start]: 10,
          // [QueryRoutes.Limit]: 9,
          [QueryRoutes.Embed]: 'comments',
        }
      });
      const {guitars, reviews} = separateGuitarAndReviews(data);
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
    }
  },
  extraReducers: (builder) =>  {
    builder
      .addCase(fetchGuitarsAction.pending, (state) => {
        state.guitarsStatus = LoadingStatus.Loading;
      })
      .addCase(fetchGuitarsAction.fulfilled, (state, action: PayloadAction<GuitarType[]>) => {
        guitarsAdapter.addMany(state, action.payload);
        state.guitarsStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchGuitarsAction.rejected, (state) => {
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

export const {setGuitarsStatus} = dataGuitars.actions;

export const rtkSelectorsGuitars = guitarsAdapter.getSelectors((state: State) => state[NameSpace.DataGuitars]);

