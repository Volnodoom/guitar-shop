import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiAction, ApiRoutes, LIMIT_GUITARS_PER_PAGE, HEADER_TOTAL_NUMBER, LoadingStatus, NameSpace, QueryRoutes, ONE, COUPLED_DATA, PagesName } from '../../const';
import { handleError } from '../../services/handle-error';
import { CoupledProductData, GeneralApiConfig, GuitarsIdsLineType, GuitarType } from '../../types/general.types';
import {  GuitarState, State } from '../../types/state.types';
import { separateGuitarAndReviews } from '../../utils/utils-components';
import { setReviews } from '../data-reviews/data-reviews';

const guitarsAdapter = createEntityAdapter<GuitarType>();

export const initialState: GuitarState = guitarsAdapter.getInitialState({
  ids: [],
  entities: {},
  totalGuitars: null,
  guitarsIdPerPage: {} as GuitarsIdsLineType,
  currentPage: ONE,
  activeTab: PagesName.Catalog.en,
  guitarsStatus: LoadingStatus.Idle,
  oneGuitarStatus: LoadingStatus.Idle,
});

export const fetchProductsAction = createAsyncThunk<void, undefined, GeneralApiConfig>(
  ApiAction.FetchGuitars,
  async (_arg, {dispatch, getState, extra: api}) => {
    try{
      const response = await api.get<CoupledProductData[]>(ApiRoutes.Guitars, {
        params: {
          [QueryRoutes.Start]: getState()[NameSpace.QueryParams].itemRangeStart,
          [QueryRoutes.Limit]: LIMIT_GUITARS_PER_PAGE,
          [QueryRoutes.Embed]: COUPLED_DATA,
        }
      });

      dispatch(setTotalGuitars(response.headers[HEADER_TOTAL_NUMBER]));

      const {guitars, reviews} = separateGuitarAndReviews(response.data);
      dispatch(setGuitarsDetails(guitars));
      dispatch(setGuitarsIdPerPage(guitars));

      dispatch(setReviews(reviews));
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);

export const fetchOneGuitarAction = createAsyncThunk<void, number, GeneralApiConfig>(
  ApiAction.FetchOneGuitar,
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<GuitarType>(ApiRoutes.Guitar(id));
      dispatch(setOneGuitarDetails(data));
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);

export const dataGuitars = createSlice({
  name: NameSpace.DataGuitars,
  initialState,
  reducers: {
    setTotalGuitars: (state, action: PayloadAction<null | number>) => {
      state.totalGuitars = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setGuitarsDetails: (state, action: PayloadAction<GuitarType[]>) => {
      guitarsAdapter.addMany(state, action.payload);
    },
    setOneGuitarDetails: (state, action: PayloadAction<GuitarType>) => {
      guitarsAdapter.addOne(state, action.payload);
    },
    setGuitarsIdPerPage: (state, action: PayloadAction<GuitarType[]>) => {
      const ids = action.payload.map((line) => line.id);
      state.guitarsIdPerPage = {
        ...state.guitarsIdPerPage,
        [state.currentPage]: ids,
      };
    },
  },
  extraReducers: (builder) =>  {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.guitarsStatus = LoadingStatus.Loading;
      })
      .addCase(fetchProductsAction.fulfilled, (state) => {
        state.guitarsStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.guitarsStatus = LoadingStatus.Failed;
      })
      .addCase(fetchOneGuitarAction.pending, (state) => {
        state.oneGuitarStatus = LoadingStatus.Loading;
      })
      .addCase(fetchOneGuitarAction.fulfilled, (state) => {
        state.oneGuitarStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchOneGuitarAction.rejected, (state) => {
        state.oneGuitarStatus = LoadingStatus.Failed;
      });
  }
});

export const {
  setTotalGuitars,
  setCurrentPage,
  setActiveTab,
  setGuitarsDetails,
  setOneGuitarDetails,
  setGuitarsIdPerPage,
} = dataGuitars.actions;

export const rtkSelectorsGuitars = guitarsAdapter.getSelectors((state: State) => state[NameSpace.DataGuitars]);

