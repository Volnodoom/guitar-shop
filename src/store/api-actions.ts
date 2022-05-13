import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiAction, ApiRoutes } from '../const';
import { GeneralApiConfig, GuitarType, ProductType, Review } from '../types/general.types';

export const fetchProductAction = createAsyncThunk<ProductType, number, GeneralApiConfig>(
  ApiAction.GetProduct,
  async (id, {dispatch, extra: api}) => {
    try {
      const [guitarResult, reviewsResult] = await Promise.all([
        api.get<GuitarType>(ApiRoutes.Guitar(id)),
        api.get<Review[]>(ApiRoutes.Reviews(id)),
      ]);
      return {guitar: guitarResult.data, reviews: reviewsResult.data};
    } catch (error) {
      throw Error(`Faced problem during your request ${error}`);
    }
  }
);
