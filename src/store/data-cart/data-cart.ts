import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, ONE } from '../../const';
import { CartContentNumberOneType, GuitarType } from '../../types/general.types';
import { CartState } from '../../types/state.types';

export const initialState: CartState = {
  cartContent: [],
  cartContentNumber: null,
  coupon: null,
};

export const dataCart = createSlice({
  name: NameSpace.DataCart,
  initialState,
  reducers: {
    addCartContent: (state, action: PayloadAction<GuitarType>) => {
      const isStoreHasItem = state.cartContent.some((guitarObject) => guitarObject.id === action.payload.id);
      if(!isStoreHasItem) {
        state.cartContent = [...state.cartContent, action.payload];
      }
    },
    removeCartContent: (state, action: PayloadAction<{guitarId: number}>) => {
      const index = state.cartContent.findIndex((guitarObject) => guitarObject.id === action.payload.guitarId);
      if(index >= 0) {
        state.cartContent.splice(index, ONE);
      }
    },
    updateCartContentNumber: (state, action: PayloadAction<CartContentNumberOneType>) => {
      state.cartContentNumber = {
        ...state.cartContentNumber,
        [action.payload.id]: action.payload.value,
      };
    },
    removeCartContentNumber: (state, action: PayloadAction<{guitarId: number}>) => {
      if(state.cartContentNumber !== null) {
        const isStoreHasItem = Object.keys(state.cartContentNumber)
          .map((keys) => Number(keys))
          .some((keys) => keys === action.payload.guitarId);
        if(isStoreHasItem) {
          const currentState = {...state.cartContentNumber};
          delete currentState[action.payload.guitarId];
          state.cartContentNumber = currentState;
        }

        const hasNumbers = Object.keys(state.cartContentNumber).length > 0;
        if(!hasNumbers) {
          state.cartContentNumber = null;
        }
      }
    }
  }
});

export const {
  addCartContent,
  removeCartContent,
  updateCartContentNumber,
  removeCartContentNumber,
} = dataCart.actions;

