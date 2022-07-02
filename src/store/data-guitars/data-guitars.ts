import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace, ONE } from '../../const';
import { GuitarsIdsLineType, GuitarsPriceRange, GuitarType } from '../../types/general.types';
import { GuitarState, State } from '../../types/state.types';
import { fetchOneGuitarAction, fetchPriceExtreme, fetchProductsAction } from './actions-guitars';


const guitarsAdapter = createEntityAdapter<GuitarType>();

export const initialState: GuitarState = guitarsAdapter.getInitialState({
  ids: [],
  entities: {},
  totalGuitars: null,
  guitarsIdPerPage: {} as GuitarsIdsLineType,
  currentPage: ONE,
  userGuitarSearch: [],
  priceExtremes: null,
  guitarsStatus: LoadingStatus.Idle,
  oneGuitarStatus: LoadingStatus.Idle,
  priceStatus: LoadingStatus.Idle,
});

export const dataGuitars = createSlice({
  name: NameSpace.DataGuitars,
  initialState,
  reducers: {
    setTotalGuitars: (state, action: PayloadAction<null | number>) => {
      state.totalGuitars = action.payload;
    },
    setPriceExtremes: (state, action: PayloadAction<null | GuitarsPriceRange>) => {
      state.priceExtremes = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
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
    clearGuitarsIdPerPage: (state) => {
      state.guitarsIdPerPage = {};
      state.guitarsStatus = LoadingStatus.Idle;
    },
    setGuitarsStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.guitarsStatus = action.payload;
    },
    setOneGuitarStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.oneGuitarStatus = action.payload;
    },
    setUserSearch: (state, action: PayloadAction<GuitarType[]>) => {
      state.userGuitarSearch = action.payload;
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
      })
      .addCase(fetchPriceExtreme.pending, (state) => {
        state.priceStatus = LoadingStatus.Loading;
      })
      .addCase(fetchPriceExtreme.fulfilled, (state) => {
        state.priceStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchPriceExtreme.rejected, (state) => {
        state.priceStatus = LoadingStatus.Failed;
      });
  }
});

export const {
  setTotalGuitars,
  setCurrentPage,
  setGuitarsDetails,
  setOneGuitarDetails,
  setGuitarsIdPerPage,
  clearGuitarsIdPerPage,
  setGuitarsStatus,
  setPriceExtremes,
  setUserSearch,
  setOneGuitarStatus,
} = dataGuitars.actions;

export const rtkSelectorsGuitars = guitarsAdapter.getSelectors((state: State) => state[NameSpace.DataGuitars]);

