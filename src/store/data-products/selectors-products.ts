import { State } from '../../types/state.types';

export const getGuitars = (state: State) => state.DATA_PRODUCTS.products;
export const getGuitarsStatus = (state: State) => state.DATA_PRODUCTS.guitarsStatus;
export const getOneGuitarStatus = (state: State) => state.DATA_PRODUCTS.oneGuitarStatus;
export const getProductStatus = (state: State) => state.DATA_PRODUCTS.productStatus;
