import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { store } from '..';
import { ApiAction, ApiRoutes, LoadingStatus, NameSpace } from '../../const';
import { GeneralApiConfig, ProductDataStore, GuitarType, Review, GuitarDataStore } from '../../types/general.types';
import { DataProducts } from '../../types/state.types';
import { restructureGuitarsData, restructureProductData } from '../../utils/utils-components';

const initialState: DataProducts = {
  products: null,
  guitarsStatus: LoadingStatus.Idle,
  oneGuitarStatus: LoadingStatus.Idle,
  productStatus: LoadingStatus.Idle,
};

export const fetchGuitarsAction = createAsyncThunk<void, undefined, GeneralApiConfig>(
  ApiAction.GetGuitars,
  async (_arg, {dispatch, extra: api}) => {
    try{
      const {data} = await api.get<GuitarType[]>(ApiRoutes.Guitars);
      dispatch(
        setAllGuitars(
          restructureGuitarsData(data)
        )
      );
      // eslint-disable-next-line no-console
      // console.log('fetchGuitarsAction', dispatch(store.getState));
    } catch (error) {
      throw Error(`Faced problem during your request ${error}`);
    }
  }
);

export const fetchOneGuitarAction = createAsyncThunk<void, number, GeneralApiConfig>(
  ApiAction.GetOneGuitar,
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<GuitarType>(ApiRoutes.Guitar(id));

      dispatch(
        setAllGuitars(
          {
            [data.id] : {
              guitar: data,
            }
          }
        )
      );
      // eslint-disable-next-line no-console
      // console.log('fetchOneGuitarAction', dispatch(store.getState));

    } catch (error) {
      throw Error(`Faced problem during your request ${error}`);
    }
  }
);

export const fetchProductAction = createAsyncThunk<void, number, GeneralApiConfig>(
  ApiAction.GetProduct,
  async (id, {dispatch, extra: api}) => {
    try {
      const [guitarResult, reviewsResult] = await Promise.all([
        api.get<GuitarType>(ApiRoutes.Guitar(id)),
        api.get<Review[]>(ApiRoutes.Reviews(id)),
      ]);

      dispatch(
        setAllGuitars(
          restructureProductData(guitarResult.data, reviewsResult.data)
        )
      );

      // eslint-disable-next-line no-console
      console.log('fetchProductAction', dispatch(store.getState));
    } catch (error) {
      throw Error(`Faced problem during your request ${error}`);
    }
  }
);

export const dataProducts = createSlice({
  name: NameSpace.DataProducts,
  initialState,
  reducers: {
    setAllGuitars: (state, action: PayloadAction<ProductDataStore | GuitarDataStore>) => {
      const update: ProductDataStore | GuitarDataStore = action.payload;
      state.products = {
        ...state.products,
        ...update,
      };
    },
  },
  extraReducers: (builder) =>  {
    builder
      .addCase(fetchGuitarsAction.pending, (state) => {
        state.guitarsStatus = LoadingStatus.Loading;
      })
      .addCase(fetchGuitarsAction.fulfilled, (state) => {
        state.guitarsStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchGuitarsAction.rejected, (state) => {
        state.guitarsStatus = LoadingStatus.Failed;
      })
      .addCase(fetchOneGuitarAction.pending, (state) => {
        state.guitarsStatus = LoadingStatus.Loading;
      })
      .addCase(fetchOneGuitarAction.fulfilled, (state) => {
        state.guitarsStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchOneGuitarAction.rejected, (state) => {
        state.guitarsStatus = LoadingStatus.Failed;
      })
      .addCase(fetchProductAction.pending, (state) => {
        state.guitarsStatus = LoadingStatus.Loading;
      })
      .addCase(fetchProductAction.fulfilled, (state) => {
        state.guitarsStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchProductAction.rejected, (state) => {
        state.guitarsStatus = LoadingStatus.Failed;
      });
  }
});

export const {
  setAllGuitars,
} = dataProducts.actions;
