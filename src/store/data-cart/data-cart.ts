import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace, ONE } from '../../const';
import { CartContentNumberOneType, GuitarType } from '../../types/general.types';
import { CartState } from '../../types/state.types';
import { fetchCouponCheckAction } from './action-cart';

export const initialState: CartState = {
  cartContent: [],
  cartContentNumber: null,
  coupon: null,
  couponStatus: LoadingStatus.Idle,
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
    },
    updateCoupon:  (state, action: PayloadAction<number | null>) => {
      state.coupon = action.payload;
    },
    setCouponStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.couponStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCouponCheckAction.pending, (state) => {
        state.couponStatus = LoadingStatus.Loading;
      })
      .addCase(fetchCouponCheckAction.fulfilled, (state) => {
        state.couponStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchCouponCheckAction.rejected, (state) => {
        state.couponStatus = LoadingStatus.Failed;
      });
  }
});

export const {
  addCartContent,
  removeCartContent,
  updateCartContentNumber,
  removeCartContentNumber,
  updateCoupon,
  setCouponStatus,
} = dataCart.actions;

