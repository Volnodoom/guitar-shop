import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ApiAction, ApiRoutes, LoadingStatus, NameSpace } from '../../const';
import { GeneralApiConfig, GuitarType } from '../../types/general.types';
import {  GuitarState, State } from '../../types/state.types';

const guitarsAdapter = createEntityAdapter<GuitarType>();

const initialState: GuitarState = guitarsAdapter.getInitialState({
  guitarsStatus: LoadingStatus.Idle,
  oneGuitarStatus: LoadingStatus.Idle,
});

export const fetchGuitarsAction = createAsyncThunk<GuitarType[], undefined, GeneralApiConfig>(
  ApiAction.FetchGuitars,
  async (_arg, {dispatch, extra: api}) => {
    try{
      const {data} = await api.get<GuitarType[]>(ApiRoutes.Guitars);
      return data;
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
  reducers: {},
  extraReducers: (builder) =>  {
    builder
      .addCase(fetchGuitarsAction.pending, (state) => {
        state.guitarsStatus = LoadingStatus.Loading;
      })
      .addCase(fetchGuitarsAction.fulfilled, (state, action) => {
        guitarsAdapter.upsertMany(state, action.payload);
        state.guitarsStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchGuitarsAction.rejected, (state) => {
        state.guitarsStatus = LoadingStatus.Failed;
      })
      .addCase(fetchOneGuitarAction.pending, (state) => {
        state.oneGuitarStatus = LoadingStatus.Loading;
      })
      .addCase(fetchOneGuitarAction.fulfilled, (state, action) => {
        guitarsAdapter.addOne(state, action.payload);
        state.oneGuitarStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchOneGuitarAction.rejected, (state) => {
        state.oneGuitarStatus = LoadingStatus.Failed;
      });
  }
});

export const rtkSelectorsGuitars = guitarsAdapter.getSelectors((state: State) => state[NameSpace.DataGuitars]);

