import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiAction, ApiRoutes } from '../../const';
import { handleError } from '../../services/handle-error';
import { CouponPost, GeneralApiConfig } from '../../types/general.types';
import { updateCoupon } from './data-cart';

export const fetchCouponCheckAction = createAsyncThunk<void, CouponPost, GeneralApiConfig>(
  ApiAction.FetchCouponCheck,
  async (couponInfo, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<number>(ApiRoutes.PostCoupon, couponInfo);
      dispatch(updateCoupon(data));
    } catch (error) {
      handleError(error);
      dispatch(updateCoupon(null));
      throw error;
    }
  }
);
