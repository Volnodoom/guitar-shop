import { LoadingStatus } from '../const';
import { store } from '../store';
import { GuitarDataStore, ProductDataStore } from './general.types';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type DataProducts = {
  products: ProductDataStore | GuitarDataStore | null,
  guitarsStatus: LoadingStatus,
  oneGuitarStatus: LoadingStatus,
  productStatus: LoadingStatus,

}
